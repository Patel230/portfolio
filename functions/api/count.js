export async function onRequest(context) {
  const count = await context.env.VISITOR_COUNTER.get('visitors')
  return new Response(count || '0', {
    headers: { 'Content-Type': 'text/plain' },
  })
}
