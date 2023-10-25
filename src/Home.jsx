import React, { useEffect, useState } from "react"
import { Container, Modal, Paper, Stack, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import Masonry from "@mui/lab/Masonry"

const Home = () => {
  const [markdownFile, setMarkdownFile] = useState()
  const [activeProject, setActiveProject] = useState()

  useEffect(() => {
    if (!activeProject?.readme) setMarkdownFile()
    else
      fetch(activeProject.readme)
        .then((response) => response.text())
        .then((text) => setMarkdownFile(text))
  }, [activeProject])

  const projects = [
    {
      name: "Meal Prep Assistant",
      description: "A project to help with meal prepping. Hosted on AWS.",
      github: "",
    },
    {
      name: "Smart Budgeting App",
      description: "A project to help with budgeting. Hosted on Azure.",
      github: "",
    },
    {
      name: "echo3D Graph View Demo",
      description: "A demo of the echo3D Graph View. Hosted on GitHub and PythonAnywhere.",
      github: "https://github.com/willkieffer/echo3D-Graph-View-Demo",
      readme: "https://raw.githubusercontent.com/willkieffer/echo3D-Graph-View-Demo/main/README.md",
    },
    {
      name: "Personal Website",
      description: "This website!",
      github: "",
      readme: "https://raw.githubusercontent.com/willkieffer/willkieffer.github.io/main/README.md",
    },
    {
      name: "Google TensorFlow/Spotify API/Microsoft Graph",
      description: `A project to analyze Spotify songs using TensorFlow and Microsoft Graph. README.md! - tensorflow! (sentiment analysis of spotify songs) - piece together second
          half of conversations (use your phone for real time responses)`,
      github: "",
    },
    {
      name: "Resy Booking Automation",
      description:
        "A project to automate booking reservations on Resy. Hosted on GitHub -> Transitioning to AWS Lambda",
      github: "https://github.com/willkieffer/resy-booking-app",
      readme: "https://raw.githubusercontent.com/willkieffer/resy-booking-app/main/README.md",
    },
  ]

  return (
    <>
      <Modal open={activeProject ? true : false} onClose={() => setActiveProject()}>
        <Container
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: "80vw",
            maxHeight: "80vh",
            overflowY: "scroll",
            transform: "translate(-50%, -50%)",
            border: "2px solid #000",
            bgcolor: "background.default",
            boxShadow: 24,
            borderRadius: "5px",
          }}
        >
          {activeProject && (
            <Stack
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h6" color="primary">
                {activeProject.name}
              </Typography>
              <Typography>{activeProject.description}</Typography>
              <ReactMarkdown children={markdownFile} />
            </Stack>
          )}
        </Container>
      </Modal>
      <Typography variant="h6">Current Projects</Typography>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {projects.map((project) => {
          return (
            <Paper
              key={project.name}
              elevation={3}
              sx={{ p: 2, bgcolor: "background.paper", cursor: "pointer" }}
              onClick={() => setActiveProject(project)}
            >
              <Stack>
                <Typography variant="h6" color="primary">
                  {project.name}
                </Typography>
                <Typography>{project.description}</Typography>
              </Stack>
            </Paper>
          )
        })}
      </Masonry>
    </>
  )
}

export default Home
