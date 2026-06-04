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
    <>
      <header>
        <div className="flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-2xl sm:text-3xl">William Kieffer</div>
          <div className="flex gap-3">
            <a href="mailto:william.kieffer@outlook.com" aria-label="Email William" title="Email William">
              <EnvelopeSimple size={32} aria-hidden />
            </a>
            <a
              href="https://github.com/willkieffer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="William Kieffer on GitHub"
              title="GitHub"
            >
              <GithubLogo size={32} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/williamkieffer24/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="William Kieffer on LinkedIn"
              title="LinkedIn"
            >
              <LinkedinLogo size={32} aria-hidden />
            </a>
          </div>
        </div>
        <nav className="flex flex-wrap justify-around border-y border-white/10" aria-label="Primary navigation">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path

            return (
              <Link
                key={path}
                to={path}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
                title={label}
                className={`flex w-20 items-center justify-center border-b-2 p-4 transition-colors hover:bg-white/10 ${
                  isActive ? 'border-white' : 'border-transparent'
                }`}
              >
                <Icon size={32} weight={isActive ? 'duotone' : 'regular'} aria-hidden />
                <span className="sr-only">{label}</span>
              </Link>
            )
          })}
        </nav>
      </header>
      <main className="flex flex-col gap-2">
        <Outlet />
      </main>
      <footer className="p-8 text-center text-sm text-gray-300">Last Updated March 2025</footer>
    </>
  )
}

export default App
