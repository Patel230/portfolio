// Approximate visitor counter. KV read-modify-write can lose updates under
// concurrency, which is acceptable here; only GET increments, and responses
// are never cached so every visitor sees a live number.
export async function onRequestGet(context) {
  const count = await context.env.VISITOR_COUNTER.get('visitors')
  const next = (parseInt(count || '0') + 1).toString()
  await context.env.VISITOR_COUNTER.put('visitors', next)
  return new Response(next, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store'
    }
  })
}
