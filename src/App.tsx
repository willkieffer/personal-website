import { createBrowserRouter, Link, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import Home from './home.tsx'
import Resume from './resume.tsx'
import Personal from './personal.tsx'
import BikeRackLocator from './nycbikeracks.tsx'
import {
  Bicycle,
  EnvelopeSimple,
  GithubLogo,
  HouseSimple,
  LinkedinLogo,
  PersonArmsSpread,
  ReadCvLogo,
} from '@phosphor-icons/react'

const navItems = [
  { path: '/', label: 'Home', icon: HouseSimple },
  { path: '/resume', label: 'Resume', icon: ReadCvLogo },
  { path: '/personal', label: 'Personal', icon: PersonArmsSpread },
  { path: '/nycbikeracks', label: 'NYC Bike Racks', icon: Bicycle },
]

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: (
        <div className="flex items-center justify-center p-8">Uh oh! There was a problem loading this content.</div>
      ),
      children: [
        {
          path: '/resume',
          element: <Resume />,
          errorElement: (
            <div className="flex items-center justify-center p-8">Uh oh! There was a problem loading this content.</div>
          ),
        },
        {
          path: '/personal',
          element: <Personal />,
          errorElement: (
            <div className="flex items-center justify-center p-8">Uh oh! There was a problem loading this content.</div>
          ),
        },
        {
          path: '/nycbikeracks',
          element: <BikeRackLocator />,
          errorElement: (
            <div className="flex items-center justify-center p-8">Uh oh! There was a problem loading this content.</div>
          ),
        },
        {
          index: true,
          element: <Home />,
          errorElement: (
            <div className="flex items-center justify-center p-8">Uh oh! There was a problem loading this content.</div>
          ),
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

const Root = () => {
  const location = useLocation()

  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-[#101113] text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#101113]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <Link to="/" className="group flex w-fit items-center gap-3 no-underline" aria-label="William Kieffer home">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/15 bg-white text-base font-semibold text-zinc-950 shadow-[0_14px_40px_rgba(0,0,0,0.3)] transition-transform group-hover:-translate-y-0.5">
              WK
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-semibold tracking-normal text-white sm:text-2xl">William Kieffer</span>
              <span className="text-sm text-zinc-400">Software engineer in NYC</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="mailto:william.kieffer@outlook.com"
              aria-label="Email William"
              title="Email William"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <EnvelopeSimple size={22} aria-hidden />
            </a>
            <a
              href="https://github.com/willkieffer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="William Kieffer on GitHub"
              title="GitHub"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <GithubLogo size={22} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/williamkieffer24/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="William Kieffer on LinkedIn"
              title="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <LinkedinLogo size={22} aria-hidden />
            </a>
          </div>
        </div>
        <nav
          className="nav-scroll mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3 lg:px-8"
          aria-label="Primary navigation"
        >
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path

            return (
              <Link
                key={path}
                to={path}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
                title={label}
                className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-100'
                    : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-100'
                }`}
              >
                <Icon size={18} weight={isActive ? 'duotone' : 'regular'} aria-hidden />
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-5 py-10 text-sm text-zinc-500 lg:px-8">
        <div className="border-t border-white/10 pt-6">Last updated March 2025</div>
      </footer>
    </div>
  )
}

export default App
