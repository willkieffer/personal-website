import React, { useEffect, useState } from "react"
import linkedinphoto from "./assets/linkedinphoto.png"
import { Button, Container, Modal, Paper, Stack, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import Masonry from "@mui/lab/Masonry"

const Home = () => {
  const [markdownFile, setMarkdownFile] = useState()
  const [activeProject, setActiveProject] = useState()
  const [projects, setProjects] = useState()

  //Fill in ...
  /* 
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
    */

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`)

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }

    if (!projects)
      fetch("https://api.github.com/user/repos", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setProjects(result)
        })
        .catch((error) => console.error("error", error))
  }, [])

  useEffect(() => {
    const fetchReadMe = async () => {
      try {
        const response = await fetch(activeProject.url + "/readme")
        if (!response.ok) throw new Error("No ReadMe")
        const download = await fetch((await response.json()).download_url)
        setMarkdownFile(await download.text())
      } catch (e) {
        console.log(e)
      }
    }
    if (activeProject) fetchReadMe()
    else setMarkdownFile()
  }, [activeProject])

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
              spacing={2}
            >
              <Typography variant="h6" color="primary">
                {activeProject.name}
              </Typography>
              <Typography>
                Last Active: {new Date(activeProject.updated_at).toDateString()}
              </Typography>
              <Typography sx={{ fontStyle: "italic" }}>
                {activeProject.description ?? "No Description Provided"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={activeProject.private}
                sx={{ mb: 2 }}
                href={activeProject.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeProject.private ? "Repo is Private" : "View Project on GitHub"}
              </Button>
              {markdownFile ? (
                <>
                  <Typography variant="h6" color="primary">
                    ReadMe.md
                  </Typography>
                  <ReactMarkdown children={markdownFile} />
                </>
              ) : (
                <Typography sx={{ fontStyle: "italic" }}>Could not locate readme</Typography>
              )}
            </Stack>
          )}
        </Container>
      </Modal>
      <Stack direction="row" spacing={4} sx={{ p: 4 }} alignItems="center" justifyContent="center">
        <img
          src={linkedinphoto}
          title="Headshot"
          id="headshot"
          alt="headshot"
          width={150}
          height={150}
        />
        <Typography variant="p" style={{ textAlign: "center", maxWidth: "50vw", fontSize: "18px" }}>
          Hello! I'm William Kieffer, a software engineer based in NYC. I'm currently finishing my
          senior year at Columbia University and am on the job hunt for when I graduate in May 2024.
          This website contains my resume, links to my social accounts, and some of the projects
          that I've been working on in my free time. Feel free to shoot me an email with any
          questions or comments, or just to say hi!
        </Typography>
      </Stack>
      <Typography variant="h6">My Current Projects</Typography>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {projects
          ?.filter((project) => project.owner.login === "willkieffer")
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map((project) => {
            return (
              <Paper
                key={project.id}
                elevation={3}
                sx={{ p: 2, bgcolor: "background.paper", cursor: "pointer" }}
                onClick={() => setActiveProject(project)}
              >
                <Stack>
                  <Typography variant="h6" color="primary">
                    {project.name}
                  </Typography>
                  <Typography>{new Date(project.updated_at).toDateString()}</Typography>
                  <Typography>{project.description}</Typography>
                </Stack>
              </Paper>
            )
          }) ?? <Typography>Loading...</Typography>}
      </Masonry>
      <Typography variant="h6">Other Projects I've Contributed To</Typography>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
        {projects
          ?.filter((project) => project.owner.login !== "willkieffer")
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map((project) => {
            return (
              <Paper
                key={project.id}
                elevation={3}
                sx={{ p: 2, bgcolor: "background.paper", cursor: "pointer" }}
                onClick={() => setActiveProject(project)}
              >
                <Stack>
                  <Typography variant="h6" color="primary">
                    {project.name}
                  </Typography>
                  <Typography>{new Date(project.updated_at).toDateString()}</Typography>
                  <Typography>{project.description}</Typography>
                </Stack>
              </Paper>
            )
          }) ?? <Typography>Loading...</Typography>}
      </Masonry>
    </>
  )
}

export default Home
