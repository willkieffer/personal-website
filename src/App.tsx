import { createBrowserRouter, Link, Navigate, Outlet, RouterProvider, useLocation } from 'react-router-dom'
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
          path: '/*',
          element: <Navigate to="/" />,
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
      <div>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-3xl">William Kieffer</div>
          <div className="flex gap-2">
            <Link to="mailto:william.kieffer@outlook.com" target="_blank">
              <EnvelopeSimple size={32} />
            </Link>
            <Link to="https://github.com/willkieffer" target="_blank">
              <GithubLogo size={32} />
            </Link>
            <Link to="https://www.linkedin.com/in/williamkieffer24/" target="_blank">
              <LinkedinLogo size={32} />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-around">
          {['', 'resume', 'personal', 'nycbikeracks'].map((path) => (
            <Link key={path} to={`/${path}`}>
              <div
                className={`${location.pathname === `/${path}` ? 'border-b-2' : null} w-18 flex cursor-pointer items-center justify-center p-4`}
              >
                {path === '' ? (
                  <HouseSimple size={32} weight={location.pathname === `/${path}` ? 'duotone' : 'regular'} />
                ) : null}
                {path === 'resume' ? (
                  <ReadCvLogo size={32} weight={location.pathname === `/${path}` ? 'duotone' : 'regular'} />
                ) : null}
                {path === 'personal' ? (
                  <PersonArmsSpread size={32} weight={location.pathname === `/${path}` ? 'duotone' : 'regular'} />
                ) : null}
                {path === 'nycbikeracks' ? (
                  <Bicycle size={32} weight={location.pathname === `/${path}` ? 'duotone' : 'regular'} />
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Outlet />
      </div>
      <div className="p-8 text-center">Last Updated September 2024</div>
    </>
  )
}

export default App
