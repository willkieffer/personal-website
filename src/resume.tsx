import { useEffect, useState } from 'react'

const Home = () => {
  const [resume, setResume] = useState<string>()

  useEffect(() => {
    const fetchResume = async () => {
      const response = await fetch(
        'https://personalwebsiteresume.blob.core.windows.net/resume/Resume - William Kieffer.pdf'
      )
      const blob = await response.blob()
      setResume(URL.createObjectURL(blob))
    }
    fetchResume()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4">
        PDF not rendering?{' '}
        <a href={resume} download="William Kieffer Resume" className="underline underline-offset-2">
          Download a copy
        </a>
      </div>
      <iframe src={resume} width="100%" height="800px" title="resume" />
    </div>
  )
}

export default Home
