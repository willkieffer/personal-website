import React, { useEffect, useState } from "react"
import linkedinphoto from "./assets/linkedinphoto.png"
import { Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"

const Home = () => {
  const [state, setState] = useState()

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/willkieffer/echo3D-Graph-View-Demo/main/README.md")
      .then((response) => response.text())
      .then((text) => setState(text))
  })

  return (
    <>
      <img src={linkedinphoto} title="Headshot" id="headshot" width={50}></img>
      <Typography variant="h5">Welcome to my personal website!</Typography>
      <Typography variant="h6">Current Projects</Typography>
      <div class="projectDetails">
        <h3 class="projectHeader">
          <a href="https://github.com/willkieffer/echo3D-Graph-View-Demo">echo3D Graph View Demo</a>
        </h3>
        <h4 class="projectHeader">Hosted on GitHub and PythonAnywhere</h4>
        <p id="toggleProject1" class="toggle">
          Collapse README.md
        </p>
      </div>
      <ReactMarkdown children={state} />
      <div class="projectDetails">
        <h3 class="projectHeader">
          <a href="https://github.com/willkieffer/willkieffer.github.io">Personal Website</a>
        </h3>
        <h4 class="projectHeader">Hosted on GitHub Pages</h4>
        <p id="toggleProject2" class="toggle">
          Collapse README.md
        </p>
      </div>
      <zero-md
        id="project2"
        class="project"
        src="https://raw.githubusercontent.com/willkieffer/willkieffer.github.io/main/README.md"
      ></zero-md>
      <div class="projectDetails">
        <h3 class="projectHeader">
          <a href="">Google TensorFlow/Spotify API/Microsoft Graph</a>
        </h3>
        <h4 class="projectHeader">Local - no project files available (yet!)</h4>
        <p id="toggleProject3" class="toggle">
          Collapse README.md
        </p>
      </div>
      <div id="project3" class="project">
        <p>
          README.md! - tensorflow! (sentiment analysis of spotify songs) - piece together second
          half of conversations (use your phone for real time responses)
        </p>
      </div>
      <div class="projectDetails">
        <h3 class="projectHeader">
          <a href="https://github.com/willkieffer/resy-booking-app">Resy Booking Automation</a>
        </h3>
        <h4 class="projectHeader">{`Hosted on GitHub -> Transitioning to AWS Lambda`}</h4>
        <p id="toggleProject4" class="toggle">
          Collapse README.md
        </p>
      </div>
      <zero-md
        id="project4"
        class="project"
        src="https://raw.githubusercontent.com/willkieffer/resy-booking-app/main/README.md"
      ></zero-md>
    </>
  )
}

export default Home
