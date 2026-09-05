const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  })

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

  try {
    const body = await context.request.json()
    const name = String(body.name || '').trim().slice(0, 120)
    const email = String(body.email || '').trim().slice(0, 200)
    const message = String(body.message || '').trim().slice(0, 4000)

    if (!name || !email || !message) {
      return json({ ok: false, error: 'All fields are required.' }, 400)
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'Please enter a valid email address.' }, 400)
    }

    // Deliver via a configured webhook (e.g. an email/HTTP relay). If none is
    // set the request still succeeds so the form UX is never broken; set the
    // CONTACT_WEBHOOK_URL secret in Cloudflare Pages to start receiving mail.
    const webhook = context.env.CONTACT_WEBHOOK_URL
    if (webhook) {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, sentAt: new Date().toISOString() })
      })
      if (!res.ok) {
        return json({ ok: false, error: 'Delivery failed. Please try again.' }, 502)
      }
    }

    return json({ ok: true })
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400)
  }
}
