import React, { useState } from "react"
import resume from "./assets/Resume - William Kieffer.pdf"
import { Document, Page, pdfjs } from "react-pdf"
import { Stack } from "@mui/material"

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const Home = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  window.addEventListener("resize", () => setWindowSize(window.innerWidth))
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Document file={resume}>
        <Page
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={windowSize}
        />
      </Document>
    </Stack>
  )
}

export default Home
