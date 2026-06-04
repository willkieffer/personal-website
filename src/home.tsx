import { useEffect, useState } from 'react'
import linkedinphoto from './assets/linkedinphoto.png'
import pulseLogo from './assets/pulseLogo.png'
import verdeLogo from './assets/verdeLogo.png'
import appleAppStore from './assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'
import ReactMarkdown from 'react-markdown'
import Masonry from '@mui/lab/Masonry'
import { Archive, ArrowSquareOut, GitBranch, Lock, X } from '@phosphor-icons/react'

type Project = {
  id: number
  name: string
  description: string | null
  url: string
  private: boolean
  archived: boolean
  fork: boolean
  updated_at: string
  html_url: string
  owner: {
    login: string
  }
}

const GITHUB_REPOS_URL = 'https://api.github.com/users/willkieffer/repos?per_page=100&sort=updated'
const PULSE_APP_STORE_URL = 'https://apps.apple.com/us/app/pulse-health-assistant/id6670768611'
const PULSE_SITE_URL = 'https://pulse.williamkieffer.works/'
const VERDE_SITE_URL = 'https://www.verdefinancialapp.com'

const technologies = [
  'Flutter',
  'AWS Amplify',
  'AWS AppSync',
  'AWS DynamoDB',
  'AWS Cognito',
  'AWS Lambda',
  'GraphQL',
  'OpenAI',
  'Google Cloud Platform',
  'Sign in with Apple',
  'Push Notifications',
  'Microsoft Graph',
]

const isAbortError = (error: unknown) => error instanceof DOMException && error.name === 'AbortError'

const sortByUpdated = (a: Project, b: Project) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()

const Home = () => {
  const [markdownFile, setMarkdownFile] = useState<string | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [projectsError, setProjectsError] = useState<string | null>(null)
  const [readmeLoading, setReadmeLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProjects = async () => {
      setProjectsLoading(true)
      setProjectsError(null)

      try {
        const response = await fetch(GITHUB_REPOS_URL, { signal: controller.signal })
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`)

        const result = await response.json()
        if (!Array.isArray(result)) throw new Error('GitHub response was not a project list')

        setProjects(result as Project[])
      } catch (error) {
        if (!isAbortError(error)) {
          setProjectsError('There was a problem fetching public projects from GitHub.')
        }
      } finally {
        if (!controller.signal.aborted) setProjectsLoading(false)
      }
    }

    fetchProjects()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!activeProject) {
      setMarkdownFile(null)
      setReadmeLoading(false)
      return
    }

    const controller = new AbortController()

    const fetchReadMe = async () => {
      setMarkdownFile(null)
      setReadmeLoading(true)

      try {
        const response = await fetch(`${activeProject.url}/readme`, { signal: controller.signal })
        if (!response.ok) throw new Error('No README')

        const readme = (await response.json()) as { download_url?: string }
        if (!readme.download_url) throw new Error('README download URL missing')

        const download = await fetch(readme.download_url, { signal: controller.signal })
        if (!download.ok) throw new Error('README download failed')

        setMarkdownFile(await download.text())
      } catch (error) {
        if (!isAbortError(error)) {
          setMarkdownFile(null)
        }
      } finally {
        if (!controller.signal.aborted) setReadmeLoading(false)
      }
    }

    fetchReadMe()

    return () => controller.abort()
  }, [activeProject])

  const ownedProjects = projects.filter((project) => project.owner.login === 'willkieffer').sort(sortByUpdated)
  const contributedProjects = projects.filter((project) => project.owner.login !== 'willkieffer').sort(sortByUpdated)

  const renderProjectCard = (project: Project) => {
    const hasFlags = project.archived || project.private || project.fork

    return (
      <div key={project.id} className="flex flex-col">
        {hasFlags ? (
          <div className="mx-4 flex w-min gap-2 rounded-t-lg bg-gray-600 p-2" aria-label="Project flags">
            {project.archived ? <Archive weight="duotone" aria-label="Archived" /> : null}
            {project.private ? <Lock weight="duotone" aria-label="Private" /> : null}
            {project.fork ? <GitBranch weight="duotone" aria-label="Fork" /> : null}
          </div>
        ) : null}
        <button
          type="button"
          disabled={project.private}
          className={`relative flex w-full select-none flex-col rounded-md p-3 text-left transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70 ${
            project.archived ? 'bg-gray-600' : 'bg-gray-700'
          }`}
          onClick={() => setActiveProject(project.private ? null : project)}
        >
          <div className="text-lg">{project.name}</div>
          {!project.archived ? (
            <div className="text-sm">Updated {new Date(project.updated_at).toDateString()}</div>
          ) : null}
          <div className="pt-2">{project.description ?? 'No description provided'}</div>
        </button>
      </div>
    )
  }

  return (
    <>
      {activeProject ? (
        <>
          <div
            onClick={() => setActiveProject(null)}
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-50"
            aria-hidden
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="fixed left-1/2 top-1/2 z-50 max-h-[80vh] w-[90vw] max-w-3xl overflow-y-auto rounded-lg border-2 border-black bg-gray-900 p-4 shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-3 top-3 rounded-full bg-gray-700 p-2"
              aria-label="Close project details"
            >
              <X size={20} aria-hidden />
            </button>
            <div className="flex flex-col gap-3 pr-10">
              <div id="project-dialog-title" className="text-lg">
                {activeProject.name}
              </div>
              {activeProject.archived ? (
                <div className="flex w-min justify-center rounded-full bg-gray-600 px-4 py-2">Archived</div>
              ) : (
                <div>Last active: {new Date(activeProject.updated_at).toDateString()}</div>
              )}
              <div className="italic">{activeProject.description ?? 'No description provided'}</div>
              <a
                href={activeProject.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-700 p-2"
              >
                View project on GitHub
                <ArrowSquareOut size={18} aria-hidden />
              </a>
              {readmeLoading ? (
                <div className="italic">Loading README...</div>
              ) : markdownFile ? (
                <>
                  <div className="text-lg">README.md</div>
                  <ReactMarkdown>{markdownFile}</ReactMarkdown>
                </>
              ) : (
                <div className="italic">Could not locate README</div>
              )}
            </div>
          </section>
        </>
      ) : null}
      <div className="flex flex-col items-center justify-center gap-4 p-6 sm:flex-row">
        <img
          src={linkedinphoto}
          title="Headshot"
          id="headshot"
          alt="William Kieffer headshot"
          width={150}
          height={150}
        />
        <div className="max-w-screen-md text-center">
          Hey! I'm William Kieffer, a software engineer based in NYC. I graduated from Columbia University with a
          Bachelor's degree in Computer Science, and I'm spending my time both searching for a job and working on Verde
          Financial&mdash;a personal finance startup designed to simplify budgeting and debt management. This website
          showcases my resume, links to my social accounts, and some of the other projects that I've been working on in
          my free time. Feel free to drop me an email with any questions or comments, or just to say hello!
        </div>
      </div>
      <a href={VERDE_SITE_URL} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-center justify-center gap-4 bg-[#50a464] p-4 text-center text-2xl">
          <img src={verdeLogo} alt="Verde Financial logo" width={75} />
          <div>Learn More about Verde Financial</div>
        </div>
      </a>
      <div className="p-4 text-center text-2xl">Personal Project Spotlight</div>
      <div className="flex flex-col items-center justify-around gap-4 bg-[#fde6ca] p-4 text-center text-2xl text-black md:flex-row">
        <div className="flex max-w-sm flex-col items-center justify-center gap-1 rounded-lg p-4">
          <img
            src={pulseLogo}
            title="MealPrepLogo"
            id="MealPrepLogo"
            alt="Pulse Health Assistant logo"
            width={75}
            height={75}
          />
          <div>Pulse Health Assistant</div>
          <div className="text-lg">Build a plan to reach your health goals.</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <a
            href={PULSE_APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="m-1"
            aria-label="Download Pulse Health Assistant on the App Store"
          >
            <img
              src={appleAppStore}
              title="Apple App Store"
              id="Apple App Store"
              alt="Download on the App Store"
              width={150}
            />
          </a>
          <div className="text-sm">(Coming soon to Android)</div>
          <a
            href={PULSE_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg underline underline-offset-2"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="p-4 text-center text-lg">Technologies</div>
      <div className="flex flex-wrap justify-center gap-3 px-4">
        {technologies.map((tech) => (
          <div key={tech} className="rounded-full bg-gray-700 px-4 py-2">
            {tech}
          </div>
        ))}
      </div>
      <div className="m-8 border" />
      <div className="flex flex-col items-center justify-center">
        {projectsLoading ? (
          <div className="p-4 text-center">Loading projects from GitHub...</div>
        ) : projectsError ? (
          <div className="p-4 text-center">{projectsError}</div>
        ) : projects.length > 0 ? (
          <>
            <div className="p-4 text-center text-lg">My Current Projects (from GitHub)</div>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ pl: 2, pr: 2, width: '100%' }}>
              {ownedProjects.map(renderProjectCard)}
            </Masonry>
            {contributedProjects.length > 0 ? (
              <>
                <div className="p-4 text-center text-lg">Other Projects I've Contributed To</div>
                <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ pl: 2, pr: 2, width: '100%' }}>
                  {contributedProjects.map(renderProjectCard)}
                </Masonry>
              </>
            ) : null}
          </>
        ) : (
          <div className="p-4 text-center">No public projects found.</div>
        )}
      </div>
    </>
  )
}

export default Home
