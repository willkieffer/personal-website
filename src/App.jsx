import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom"
import Home from "./Home"
import Connect from "./Connect"
import Links from "./Links"
import Resume from "./Resume"
import Personal from "./Personal"
import { Button, createTheme, Divider, Stack, ThemeProvider, Typography } from "@mui/material"
import { blueGrey, cyan } from "@mui/material/colors"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <h1>404</h1>,
      children: [
        {
          path: "/home",
          element: <Home />,
          errorElement: <h1>404</h1>,
        },
        {
          path: "/connect",
          element: <Connect />,
          errorElement: <h1>404</h1>,
        },
        {
          path: "/links",
          element: <Links />,
          errorElement: <h1>404</h1>,
        },
        {
          path: "/resume",
          element: <Resume />,
          errorElement: <h1>404</h1>,
        },
        {
          path: "/personal",
          element: <Personal />,
          errorElement: <h1>404</h1>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

const Root = () => {
  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: cyan,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h5" color="primary" textAlign="center" sx={{ p: 2 }}>
        William Kieffer
      </Typography>
      <Stack direction="row" justifyContent="space-around">
        <Link to={"/home"}>
          <Button sx={{ p: 3 }}>Home</Button>
        </Link>
        <Link to={"/resume"}>
          <Button sx={{ p: 3 }}>Resume</Button>
        </Link>
        <Link to={"/personal"}>
          <Button sx={{ p: 3 }}>Personal</Button>
        </Link>
        <Link to={"/links"}>
          <Button sx={{ p: 3 }}>Links</Button>
        </Link>
        <Link to={"/connect"}>
          <Button sx={{ p: 3 }}>Connect</Button>
        </Link>
      </Stack>
      <Divider />
      <Stack spacing={2} sx={{ p: 2 }}>
        <Outlet />
      </Stack>
      <Divider />
      <Typography color="primary" textAlign="center" sx={{ p: 3 }}>
        Last Updated October 2023
      </Typography>
    </ThemeProvider>
  )
}

export default App
