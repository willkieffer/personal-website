import { useEffect, useState } from 'react'

const RESUME_URL = 'https://personalwebsiteresume.blob.core.windows.net/resume/Resume - William Kieffer.pdf'

const Resume = () => {
  const [resume, setResume] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let objectUrl: string | null = null

    const fetchResume = async () => {
      setError(null)

      try {
        const response = await fetch(RESUME_URL, { signal: controller.signal })
        if (!response.ok) throw new Error(`Resume returned ${response.status}`)

        const blob = await response.blob()
        objectUrl = URL.createObjectURL(blob)
        setResume(objectUrl)
      } catch (fetchError) {
        if (!(fetchError instanceof DOMException && fetchError.name === 'AbortError')) {
          setError('There was a problem loading the resume PDF.')
        }
      }
    }

    fetchResume()

    return () => {
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4 text-center">
        PDF not rendering?{' '}
        <a
          href={resume ?? RESUME_URL}
          download="William Kieffer Resume"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Download a copy
        </a>
      </div>
      {error ? (
        <div className="p-4 text-center">{error}</div>
      ) : resume ? (
        <iframe src={resume} width="100%" height="800" title="William Kieffer resume PDF" />
      ) : (
        <div className="p-8 text-center">Loading resume...</div>
      )}
    </div>
  )
}

export default Resume
