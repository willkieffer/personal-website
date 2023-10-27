import React, { useEffect, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Stack } from "@mui/material"

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const Home = () => {
  const [resume, setResume] = useState()
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  window.addEventListener("resize", () => setWindowSize(window.innerWidth))

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
      {resume && (
        <Document file={resume}>
          <Page
            pageNumber={1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={windowSize}
          />
        </Document>
      )}
    </Stack>
  )
}

export default Home
