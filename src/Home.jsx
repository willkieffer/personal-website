import React, { useEffect, useState } from "react"
import linkedinphoto from "./assets/linkedinphoto.png"
import logoTransparent from "./assets/logoTransparent.png"
import { Button, Chip, Container, Grid, Modal, Paper, Stack, Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import Masonry from "@mui/lab/Masonry"
import { Lock } from "@phosphor-icons/react"

const Home = () => {
  const [markdownFile, setMarkdownFile] = useState()
  const [activeProject, setActiveProject] = useState()
  const [projects, setProjects] = useState([])
  const [mealPrepPhoto1, setMealPrepPhoto1] = useState()
  const [mealPrepPhoto2, setMealPrepPhoto2] = useState()
  const [mealPrepPhoto3, setMealPrepPhoto3] = useState()
  const [mealPrepPhoto4, setMealPrepPhoto4] = useState()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    document.addEventListener("resize", () => setWindowWidth(window.innerWidth))
    return () => {
      document.removeEventListener("resize", () => setWindowWidth(window.innerWidth))
    }
  }, [])

  useEffect(() => {
    var myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`)

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }

    if (!projects.length)
      fetch("https://api.github.com/user/repos", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setProjects(result)
        })
        .catch((error) => console.error("error", error))

    if (!mealPrepPhoto1)
      fetch(
        "https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepApp_Screenshot (1).jpg"
      )
        .then((response) => response.blob())
        .then((result) => {
          setMealPrepPhoto1(URL.createObjectURL(result))
        })

    if (!mealPrepPhoto2)
      fetch(
        "https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepApp_Screenshot (2).jpg"
      )
        .then((response) => response.blob())
        .then((result) => {
          setMealPrepPhoto2(URL.createObjectURL(result))
        })

    if (!mealPrepPhoto3)
      fetch(
        "https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepApp_Screenshot (3).jpg"
      )
        .then((response) => response.blob())
        .then((result) => {
          setMealPrepPhoto3(URL.createObjectURL(result))
        })

    if (!mealPrepPhoto4)
      fetch(
        "https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepApp_Screenshot (4).jpg"
      )
        .then((response) => response.blob())
        .then((result) => {
          setMealPrepPhoto4(URL.createObjectURL(result))
        })
  })

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
                {activeProject.private ? "Created At" : "Last Active"}:{" "}
                {new Date(activeProject.updated_at).toDateString()}
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
      <Stack
        direction={windowWidth < 700 ? "column" : "row"}
        spacing={4}
        sx={{ p: 4 }}
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={linkedinphoto}
          title="Headshot"
          id="headshot"
          alt="headshot"
          width={150}
          height={150}
        />
        <Typography
          variant="p"
          style={{
            textAlign: "center",
            maxWidth: windowWidth < 700 ? null : "50vw",
            fontSize: "18px",
          }}
        >
          Hi there! I’m William Kieffer, a software engineer based in NYC. I’m currently in my
          senior year at Columbia University, and I’m searching for a job to begin after graduation
          in May 2024. This website showcases my resume, links to my social accounts, and some of
          the projects that I’ve been working on in my free time. Feel free to drop me an email with
          any questions or comments, or just to say hello!
        </Typography>
      </Stack>
      <Stack sx={{ bgcolor: (theme) => theme.palette.secondary.main }}>
        <Typography variant="h6" color="primary" sx={{ p: 2 }}>
          Project Spotlight
        </Typography>
        <Stack
          direction={windowWidth < 700 ? "column" : "row"}
          justifyContent={windowWidth < 700 ? "center" : null}
        >
          <Stack
            direction="column"
            spacing={2}
            alignItems={windowWidth < 700 ? "center" : null}
            style={{
              width: windowWidth < 700 ? "-webkit-fill-available" : "50%",
              padding: "20px",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <img
                src={logoTransparent}
                title="MealPrepLogo"
                id="MealPrepLogo"
                alt="MealPrepLogo"
                width={75}
                height={75}
              />
              <Typography variant="h5">Meal Prep Assistant</Typography>
            </Stack>
            <Typography variant="h6">Features</Typography>
            <Typography>
              📅 Set weekly meal plans and workouts <br />
            </Typography>
            <Typography>
              🍱 Create and edit meals and recipes <br />
            </Typography>
            <Typography>
              🥡 Add one-off meals for restaurants or takeout <br />
            </Typography>
            <Typography>
              ✨ Use generative AI for ideas, ingredients, and recipes <br />
            </Typography>
            <Typography>
              📊 Set goals and track calorie count, protein intake, and expenditure <br />
            </Typography>
            <Typography>📋 Export grocery lists to Microsoft To Do</Typography>
            <Typography variant="h6">Technologies Used</Typography>
            <Grid container spacing={1}>
              {[
                "React",
                "AWS Amplify",
                "GraphQL",
                "AWS DynamoDB",
                "AWS Cognito",
                "AWS Lambda",
                "OpenAI",
                "Google Cloud Platform",
                "Microsoft Graph",
              ].map((tech) => (
                <Grid item key={tech} sx={{ pr: 1 }}>
                  <Chip label={tech} />
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              bgcolor: (theme) => theme.palette.background.paper,
              overflowX: "scroll",
              width: windowWidth < 500 ? "-webkit-fill-available" : "45%",
              padding: "20px",
              boxShadow: "-4px 0px 20px 5px #00000052",
              height: "630px",
            }}
          >
            <iframe
              title="MealPrepVideo"
              id="MealPrepVideo"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              src="https://youtube.com/embed/ixJa6BlQJ34"
              width={700}
            ></iframe>
            <img
              src={mealPrepPhoto2}
              alt="mealPrepPhoto2"
              width={300}
              style={{ objectFit: "contain" }}
            />
            <img
              src={mealPrepPhoto3}
              alt="mealPrepPhoto3"
              width={300}
              style={{ objectFit: "contain" }}
            />
            <img
              src={mealPrepPhoto4}
              alt="mealPrepPhoto4"
              width={300}
              style={{ objectFit: "contain" }}
            />
            <img
              src={mealPrepPhoto1}
              alt="mealPrepPhoto1"
              width={300}
              style={{ objectFit: "contain" }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Typography variant="h6" sx={{ pl: 2, pr: 2 }}>
        My Current Projects (from GitHub)
      </Typography>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ pl: 2, pr: 2 }}>
        {projects
          .filter((project) => project.owner.login === "willkieffer")
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map((project) => {
            return (
              <Paper
                key={project.id}
                elevation={project.private ? 0 : 3}
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  cursor: project.private ? "default" : "pointer",
                }}
                onClick={() => setActiveProject(project.private ? null : project)}
              >
                <Stack style={{ position: "relative" }}>
                  {project.private && (
                    <Lock
                      style={{ position: "absolute", top: "0", right: "0" }}
                      weight="bold"
                      color="grey"
                    />
                  )}
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
      <Typography variant="h6" sx={{ pl: 2, pr: 2 }}>
        Other Projects I've Contributed To
      </Typography>
      <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ pl: 2, pr: 2 }}>
        {projects
          .filter((project) => project.owner.login !== "willkieffer")
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .map((project) => {
            return (
              <Paper
                key={project.id}
                elevation={project.private ? 0 : 3}
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  cursor: project.private ? "default" : "pointer",
                }}
                onClick={() => setActiveProject(project.private ? null : project)}
              >
                <Stack style={{ position: "relative" }}>
                  {project.private && (
                    <Lock
                      style={{ position: "absolute", top: "0", right: "0" }}
                      weight="bold"
                      color="grey"
                    />
                  )}
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
