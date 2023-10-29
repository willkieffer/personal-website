import React, { useEffect, useState } from "react"
import { Stack, Typography } from "@mui/material"

const Home = () => {
  const [resume, setResume] = useState()

  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(
        "https://personalwebsiteresume.blob.core.windows.net/resume/Resume - William Kieffer.pdf"
      )
      const blob = await response.blob()
      setResume(URL.createObjectURL(blob))
    }
    fetchResume()
  }, [])

  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Typography variant="p" sx={{ m: 2 }}>
        PDF not rendering?{" "}
        <a href={resume} download="William Kieffer Resume">
          Download a copy
        </a>
      </Typography>
      <iframe src={resume} width="100%" height="800px" title="resume" />
    </Stack>
  )
}

export default Home
