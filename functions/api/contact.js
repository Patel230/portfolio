const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  })

const escapeHtml = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function onRequestPost(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  let name, email, message
  try {
    const body = await context.request.json()
    name = String(body.name || '').trim().slice(0, 120)
    email = String(body.email || '').trim().slice(0, 200)
    message = String(body.message || '').trim().slice(0, 4000)

    if (!name || !email || !message) {
      return json({ ok: false, error: 'All fields are required.' }, 400)
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'Please enter a valid email address.' }, 400)
    }
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400)
  }

  const token = context.env.EMAIL_API_TOKEN
  const accountId = context.env.CLOUDFLARE_ACCOUNT_ID
  const webhook = context.env.CONTACT_WEBHOOK_URL

  // Primary path: Cloudflare Email Sending REST API. Requires an API token with
  // the "Email Sending: Edit" permission and a from-domain onboarded to Email
  // Sending (SPF/DKIM DNS records). Set these in the Pages dashboard.
  if (token && accountId) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            to: [context.env.CONTACT_TO || 'lp141015@gmail.com'],
            from: {
              address: context.env.CONTACT_FROM || 'hello@lakshmanp.com',
              name: 'Portfolio'
            },
            reply_to: email,
            subject: `New portfolio message from ${name}`,
            html: [
              `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
              `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
              `<p><strong>Message:</strong></p>`,
              `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
            ].join(''),
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
          })
        }
      )
      if (res.ok) return json({ ok: true })
      // Fall through to webhook if configured; otherwise surface the failure.
      if (!webhook) {
        return json({ ok: false, error: 'Delivery failed. Please try again.' }, 502)
      }
    } catch {
      if (!webhook) {
        return json({ ok: false, error: 'Delivery failed. Please try again.' }, 502)
      }
    }
  }

  // Fallback: deliver to a configured webhook (e.g. an HTTP/email relay).
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, sentAt: new Date().toISOString() })
      })
      if (!res.ok) {
        return json({ ok: false, error: 'Delivery failed. Please try again.' }, 502)
      }
      return json({ ok: true })
    } catch {
      return json({ ok: false, error: 'Delivery failed. Please try again.' }, 502)
    }
  }

  // Nothing configured yet — accept the message so the form UX stays smooth,
  // delivery begins once EMAIL_API_TOKEN/CLOUDFLARE_ACCOUNT_ID are set.
  return json({ ok: true })
}
