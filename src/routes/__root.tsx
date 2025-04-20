import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <main className="w-screen h-screen overflow-hidden">
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
})