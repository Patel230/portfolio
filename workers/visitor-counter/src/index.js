export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/count') {
      const count = await env.VISITOR_COUNTER.get('visitors')
      return new Response(count || '0', {
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain' },
      })
    }

    if (url.pathname === '/visit') {
      const count = await env.VISITOR_COUNTER.get('visitors')
      const next = (parseInt(count || '0') + 1).toString()
      await env.VISITOR_COUNTER.put('visitors', next)
      return new Response(next, {
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain' },
      })
    }

    return new Response('Not found', { status: 404 })
  },
}
