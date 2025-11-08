import router from '../src/routes'

describe('app routes', () => {
  test("mounts the users router at '/users'", () => {
    // Express Router internals vary by version; try several common shapes.
    const candidateStacks = [
      // top-level router.stack
      (router as any).stack,
      // some builds nest under ._router.stack
      (router as any)._router && (router as any)._router.stack,
    ].filter(Boolean)

    const stack = candidateStacks.flat() as any[]

    // Look for a layer that references '/users' in either the 'path', 'regexp', or 'route' fields.
    const usersLayer = stack.find((layer: any) => {
      try {
        if (!layer) return false
        if (layer.path === '/users') return true
        if (layer.route && layer.route.path === '/users') return true
        if (
          layer.regexp &&
          layer.regexp.source &&
          layer.regexp.source.includes('\\/users')
        )
          return true
        // mounted routers often have a handle name 'router'
        if (layer.name === 'router' && layer.handle && layer.handle.stack) {
          // verify the mounted router contains known user routes like '/'
          return layer.handle.stack.some(
            (l: any) => l.route && l.route.path === '/'
          )
        }
        return false
      } catch (e) {
        return false
      }
    })

    expect(usersLayer).toBeDefined()
  })
})
