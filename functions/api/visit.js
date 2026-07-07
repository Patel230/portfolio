export async function onRequest(context) {
  const count = await context.env.VISITOR_COUNTER.get('visitors')
  const next = (parseInt(count || '0') + 1).toString()
  await context.env.VISITOR_COUNTER.put('visitors', next)
  return new Response(next, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
