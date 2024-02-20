import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom"
import Home from "./Home"
import Resume from "./Resume"
import Personal from "./Personal"
import { Button, createTheme, Stack, ThemeProvider, Typography } from "@mui/material"
import { blueGrey } from "@mui/material/colors"
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <h1>404</h1>,
      children: [
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
        {
          path: "/*",
          element: <Navigate to="/" />,
        },
        {
          index: true,
          element: <Home />,
          errorElement: <h1>404</h1>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

const Root = () => {
  const location = useLocation()

  const theme = createTheme({
    palette: {
      primary: blueGrey,
      secondary: {
        main: "#e2ebef",
      },
      background: {
        paper: "#fafafa",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ boxShadow: "-4px 0px 20px 5px #00000052" }}>
        <Typography
          variant="h5"
          color="primary"
          textAlign={window.innerWidth < 700 ? "left" : "center"}
          sx={{ p: 2 }}
        >
          William Kieffer
        </Typography>
        <Stack direction="row" sx={{ m: 2, position: "absolute", top: 0, right: 0 }} spacing={2}>
          <Link to="mailto:william.kieffer@outlook.com" target="_blank">
            <EnvelopeSimple color={theme.palette.primary.main} size={32} />
          </Link>
          <Link to="https://github.com/willkieffer" target="_blank">
            <GithubLogo color={theme.palette.primary.main} size={32} />
          </Link>
          <Link to="https://www.linkedin.com/in/williamkieffer24/" target="_blank">
            <LinkedinLogo color={theme.palette.primary.main} size={32} />
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Link to={"/"}>
            <Button
              sx={{ p: 3, width: 100, fontWeight: location.pathname === "/" ? "bold" : null }}
            >
              Home
            </Button>
          </Link>
          <Link to={"/resume"}>
            <Button
              sx={{ p: 3, width: 100, fontWeight: location.pathname === "/resume" ? "bold" : null }}
            >
              Resume
            </Button>
          </Link>
          <Link to={"/personal"}>
            <Button
              sx={{
                p: 3,
                width: 100,
                fontWeight: location.pathname === "/personal" ? "bold" : null,
              }}
            >
              Personal
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Outlet />
      </Stack>
      <Typography
        color="primary"
        textAlign="center"
        sx={{ p: 3, boxShadow: "-4px 0px 20px 5px #00000052" }}
      >
        Last Updated February 2024
      </Typography>
    </ThemeProvider>
  )
}

export default App
