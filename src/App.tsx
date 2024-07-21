import { createBrowserRouter, Link, Navigate, Outlet, RouterProvider, useLocation } from 'react-router-dom'
import Home from './home.tsx'
import Resume from './resume.tsx'
import Personal from './personal.tsx'
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

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

  // const theme = createTheme({
  //   palette: {
  //     primary: blueGrey,
  //     secondary: {
  //       main: '#e2ebef',
  //     },
  //     background: {
  //       paper: '#fafafa',
  //     },
  //   },
  // })

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
          <Link to={'/'}>
            <div className={`${location.pathname === '/' ? 'font-bold' : null} w-36 cursor-pointer p-6 text-center`}>
              HOME
            </div>
          </Link>
          <Link to={'/resume'}>
            <div
              className={`${location.pathname === '/resume' ? 'font-bold' : null} w-36 cursor-pointer p-6 text-center`}
            >
              RESUME
            </div>
          </Link>
          <Link to={'/personal'}>
            <div
              className={`${location.pathname === '/personal' ? 'font-bold' : null} w-36 cursor-pointer p-6 text-center`}
            >
              PERSONAL
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Outlet />
      </div>
      <div className="p-8 text-center">Last Updated July 2024</div>
    </>
  )
}

export default App
