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
    <section className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
      <div className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-center text-sm text-zinc-300">
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
        <div className="mt-4 rounded-md border border-red-300/20 bg-red-500/10 p-4 text-center text-red-100">
          {error}
        </div>
      ) : resume ? (
        <iframe
          src={resume}
          className="mt-5 h-[800px] w-full rounded-md border border-white/10 bg-white"
          title="William Kieffer resume PDF"
        />
      ) : (
        <div className="mt-4 rounded-md border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-300">
          Loading resume...
        </div>
      )}
    </section>
  )
}

export default Resume
