import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import linkedinphoto from './assets/linkedinphoto.png'
import pulseLogo from './assets/pulseLogo.png'
import verdeLogo from './assets/verdeLogo.png'
import appleAppStore from './assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg'
import ReactMarkdown from 'react-markdown'
import Masonry from '@mui/lab/Masonry'
import {
  Archive,
  ArrowSquareOut,
  Briefcase,
  ChartLineUp,
  CloudArrowUp,
  Database,
  Desktop,
  FileText,
  Folders,
  GitBranch,
  Lock,
  ShieldCheck,
  Sparkle,
  TerminalWindow,
  UsersThree,
  X,
} from '@phosphor-icons/react'

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
const VERDE_WEB_APP_URL = 'https://app.verde.williamkieffer.works'

const capabilitiesAndStack = [
  'Technology leadership',
  'Workflow analysis',
  'Product strategy',
  'TypeScript',
  'React',
  'Electron',
  'GraphQL',
  'Apollo',
  'AWS',
  'Serverless',
  'DynamoDB',
  'S3',
  'Cognito',
  'Lambda',
  'PDF/Excel generation',
  'Native Windows APIs',
  'OpenAI',
  'Microsoft Graph',
  'Sentry',
]

const profileSummary = [
  { value: 'CTO', label: 'Expressive Lighting' },
  { value: 'Internal tools', label: 'Quoting, projects, files, and reporting' },
  { value: 'Workflow automation', label: 'Software for clearer operations' },
]

const focusAreas = [
  {
    title: 'Operational workflow tools',
    description:
      'I build software around the way teams actually work: quoting, project handoffs, task tracking, files, approvals, and reporting.',
    icon: Folders,
  },
  {
    title: 'Reliable internal systems',
    description:
      'I turn scattered process knowledge into structured data, clear permissions, generated documents, and repeatable workflows.',
    icon: Database,
  },
  {
    title: 'Practical automation',
    description:
      'I use APIs and AI where they remove real friction: email handling, data review, document workflows, and routine operational steps.',
    icon: Sparkle,
  },
]

const exlLeadershipSnapshot = [
  { title: 'Role', value: 'Technology leadership and hands-on product engineering', icon: Briefcase },
  { title: 'Scope', value: 'Internal software for daily project and revenue workflows', icon: Desktop },
  { title: 'Goal', value: 'Fewer manual handoffs and more dependable execution', icon: ChartLineUp },
]

const exlPlatformSnapshot = [
  { value: 'Quoting', label: 'Structured line-item workflows and generated documents' },
  { value: 'Projects', label: 'Records, files, tasks, communication, and coordination' },
  { value: 'Automation', label: 'Email, reporting, AI assistance, and admin workflows' },
]

const exlPlatformHighlights = [
  {
    title: 'Project operations',
    description:
      'A shared workspace for project records, files, tasks, communication, and the context people need to move work forward.',
    icon: Folders,
  },
  {
    title: 'Quoting workflows',
    description:
      'Dense line-item editing, approvals, imports, and PDF/Excel generation for the parts of the business where accuracy matters.',
    icon: FileText,
  },
  {
    title: 'Team visibility',
    description:
      'Locks, notifications, review flows, and shared state help estimating, project management, and administration stay aligned.',
    icon: UsersThree,
  },
  {
    title: 'Structured data',
    description:
      'GraphQL, generated types, migrations, and authorization rules keep business records consistent across the application.',
    icon: Database,
  },
  {
    title: 'AI-assisted work',
    description:
      'AI supports repetitive review and routing steps where a human should still stay in control of the final decision.',
    icon: Sparkle,
  },
  {
    title: 'Production ownership',
    description:
      'Version gates, packaging, error reporting, and support workflows keep the platform maintainable after launch.',
    icon: ShieldCheck,
  },
]

const exlPlatformArchitecture = [
  {
    title: 'Desktop application',
    description:
      'Electron and React provide a focused workspace for high-volume operational tasks and Windows-native behavior.',
    icon: Desktop,
  },
  {
    title: 'Typed product UI',
    description:
      'TypeScript, Apollo, generated GraphQL types, and saved table state support data-heavy screens without guesswork.',
    icon: TerminalWindow,
  },
  {
    title: 'Backend services',
    description:
      'AWS services support authentication, files, realtime events, email workflows, search, and business data.',
    icon: CloudArrowUp,
  },
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
    const flags = [
      project.archived ? { label: 'Archived', icon: Archive } : null,
      project.private ? { label: 'Private', icon: Lock } : null,
      project.fork ? { label: 'Fork', icon: GitBranch } : null,
    ].filter(Boolean) as { label: string; icon: typeof Archive }[]

    return (
      <article
        key={project.id}
        className="group flex flex-col rounded-md border border-white/10 bg-zinc-950/50 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-colors hover:border-cyan-300/35 hover:bg-zinc-900/80"
      >
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            disabled={project.private}
            className="min-w-0 flex-1 select-none text-left disabled:cursor-not-allowed disabled:opacity-70"
            onClick={() => setActiveProject(project.private ? null : project)}
          >
            <div className="break-words text-base font-semibold text-white transition-colors group-hover:text-cyan-100">
              {project.name}
            </div>
            {!project.archived ? (
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
                Updated {new Date(project.updated_at).toLocaleDateString()}
              </div>
            ) : null}
          </button>
          {!project.private ? (
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-cyan-300/50 hover:text-cyan-100"
              aria-label={`Open ${project.name} on GitHub`}
              title="Open on GitHub"
            >
              <ArrowSquareOut size={18} aria-hidden />
            </a>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-6 text-zinc-300">{project.description ?? 'No description provided'}</p>
        {flags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Project flags">
            {flags.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-100"
              >
                <Icon size={14} weight="duotone" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    )
  }

  return (
    <>
      {activeProject ? (
        <>
          <div
            onClick={() => setActiveProject(null)}
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/70 backdrop-blur-sm"
            aria-hidden
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="fixed left-1/2 top-1/2 z-50 max-h-[82vh] w-[92vw] max-w-3xl overflow-y-auto rounded-md border border-white/10 bg-zinc-950 p-5 shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:text-white"
              aria-label="Close project details"
            >
              <X size={18} aria-hidden />
            </button>
            <div className="flex flex-col gap-4 pr-10">
              <div id="project-dialog-title" className="text-2xl font-semibold text-white">
                {activeProject.name}
              </div>
              {activeProject.archived ? (
                <div className="w-fit rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm text-amber-100">
                  Archived
                </div>
              ) : (
                <div className="text-sm uppercase tracking-[0.18em] text-zinc-500">
                  Last active {new Date(activeProject.updated_at).toLocaleDateString()}
                </div>
              )}
              <p className="text-zinc-300">{activeProject.description ?? 'No description provided'}</p>
              <a
                href={activeProject.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-300/15"
              >
                View project on GitHub
                <ArrowSquareOut size={18} aria-hidden />
              </a>
              {readmeLoading ? (
                <div className="text-zinc-400">Loading README...</div>
              ) : markdownFile ? (
                <div className="markdown-body">
                  <div className="mb-3 text-sm uppercase tracking-[0.18em] text-zinc-500">README.md</div>
                  <ReactMarkdown>{markdownFile}</ReactMarkdown>
                </div>
              ) : (
                <div className="text-zinc-400">Could not locate README</div>
              )}
            </div>
          </section>
        </>
      ) : null}

      <section className="mx-auto grid w-full max-w-7xl gap-10 overflow-hidden px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-16">
        <div className="hero-copy w-full min-w-0">
          <div className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-sm font-medium text-emerald-100">
            CTO, Expressive Lighting
          </div>
          <h1 className="mt-6 w-full max-w-xs text-3xl font-semibold leading-tight text-white sm:max-w-4xl sm:text-5xl lg:text-6xl">
            <span className="block">I build software</span>
            <span className="block">that makes operations</span>
            <span className="block">easier to run.</span>
          </h1>
          <p className="mt-5 w-full max-w-xs break-words text-base leading-7 text-zinc-300 sm:max-w-2xl sm:text-lg sm:leading-8">
            I&apos;m William Kieffer, CTO of Expressive Lighting. I lead technology and build internal tools that make
            quoting, project work, files, reporting, and day-to-day coordination more reliable.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/resume"
              className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-cyan-100"
            >
              View resume
            </Link>
            <a
              href="#exl-platform-case-study"
              className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-300/50 hover:text-cyan-100"
            >
              See featured work
            </a>
            <a
              href="mailto:william.kieffer@outlook.com"
              className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-emerald-300/50 hover:text-emerald-100"
            >
              Contact
            </a>
          </div>
          <dl className="mt-9 grid w-full max-w-xs gap-3 sm:max-w-none sm:grid-cols-3">
            {profileSummary.map((point) => (
              <div key={point.value} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                <dt className="text-sm text-zinc-500">{point.label}</dt>
                <dd className="mt-1 font-semibold text-white">{point.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-portrait mx-auto flex min-w-0 flex-col items-center gap-4 lg:items-end">
          <div className="relative flex justify-center">
            <div className="absolute inset-x-6 bottom-0 top-10 rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
            <img
              src={linkedinphoto}
              title="Headshot"
              id="headshot"
              alt="William Kieffer headshot"
              className="relative aspect-square w-64 rounded-md border border-white/15 object-cover shadow-[0_28px_80px_rgba(0,0,0,0.45)] sm:w-80"
            />
          </div>
          <div className="w-full max-w-80 rounded-md border border-white/10 bg-zinc-950/90 p-4 shadow-2xl backdrop-blur">
            <div className="text-sm uppercase tracking-[0.18em] text-cyan-200">Current focus</div>
            <div className="mt-1 text-sm leading-6 text-zinc-300">
              Leading technical direction while staying close to the software that runs the business.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">What I do</div>
              <h2 className="mt-2 text-3xl font-semibold text-white">Custom software for operational work</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              My work sits where business process, product judgment, and engineering meet. The goal is simple:
              replace fragile manual steps with software people can trust.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {focusAreas.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-md border border-white/10 bg-zinc-950/45 p-5 transition-colors hover:border-emerald-300/30"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md border border-emerald-300/20 bg-emerald-300/10 text-emerald-100">
                  <Icon size={22} weight="duotone" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
              </article>
            ))}
          </div>

          <div id="exl-platform-case-study" className="mt-8 scroll-mt-28 border-y border-cyan-300/20 py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-medium text-cyan-100">
                  <Desktop size={15} weight="duotone" aria-hidden />
                  Expressive Lighting (EXL)
                </div>
                <h3 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Expressive Lighting operations platform
                </h3>
                <p className="mt-5 text-lg leading-8 text-zinc-300">
                  A desktop-first internal system for the core workflows behind Expressive Lighting: quotes, projects,
                  files, tasks, email, reporting, and administration.
                </p>
                <p className="mt-4 leading-7 text-zinc-400">
                  I lead the roadmap and build the platform hands-on, keeping the software close to the people using it
                  while giving the company a more consistent way to run complex work.
                </p>
              </div>
              <div className="grid w-full gap-3 rounded-md border border-white/10 bg-zinc-950/55 p-4 lg:w-80">
                {exlLeadershipSnapshot.map(({ title, value, icon: Icon }) => (
                  <div key={title} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-cyan-100">
                      <Icon size={20} weight="duotone" aria-hidden />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">{title}</div>
                      <div className="mt-1 text-sm font-medium leading-6 text-zinc-100">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <dl className="mt-7 grid gap-3 lg:grid-cols-3">
              {exlPlatformSnapshot.map((item) => (
                <div key={item.value} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                  <dt className="text-sm text-zinc-500">{item.label}</dt>
                  <dd className="mt-2 text-lg font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">How it works</div>
                <h4 className="mt-2 text-2xl font-semibold text-white">A practical system for real business flow</h4>
                <p className="mt-4 leading-7 text-zinc-400">
                  The platform combines desktop behavior, cloud data, document generation, permissions, and automation
                  in one place. It is built for daily use, not demos.
                </p>
              </div>
              <div className="grid gap-3">
                {exlPlatformArchitecture.map(({ title, description, icon: Icon }) => (
                  <article
                    key={title}
                    className="grid gap-3 rounded-md border border-white/10 bg-zinc-950/45 p-4 sm:grid-cols-[auto_1fr]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                      <Icon size={22} weight="duotone" aria-hidden />
                    </span>
                    <div>
                      <h5 className="text-base font-semibold text-white">{title}</h5>
                      <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">Key responsibilities</div>
              <h4 className="mt-2 text-2xl font-semibold text-white">Representative work</h4>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {exlPlatformHighlights.map(({ title, description, icon: Icon }) => (
                  <article
                    key={title}
                    className="rounded-md border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-cyan-300/35"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.05] text-cyan-100">
                        <Icon size={21} weight="duotone" aria-hidden />
                      </span>
                      <h5 className="text-base font-semibold text-white">{title}</h5>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">Selected product work</div>
              <h3 className="mt-2 text-2xl font-semibold text-white">Independent apps and experiments</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-400">
              Smaller products where I can explore product design, mobile delivery, and consumer workflows.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="group rounded-md border border-emerald-300/20 bg-emerald-300/[0.06] p-5 transition-colors hover:border-emerald-200/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-white p-2">
                    <img src={verdeLogo} alt="Verde Financial logo" className="max-h-12 object-contain" />
                  </span>
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-emerald-100">Personal finance</div>
                    <div className="mt-1 text-2xl font-semibold text-white">Verde Financial</div>
                  </div>
                </div>
                <ArrowSquareOut
                  size={22}
                  className="shrink-0 text-emerald-100 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
              <p className="mt-5 leading-7 text-zinc-300">
                A finance product focused on budgeting, account visibility, recurring charges, and debt planning.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={VERDE_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 underline underline-offset-4"
                >
                  View promo page
                  <ArrowSquareOut size={15} aria-hidden />
                </a>
                <a
                  href={VERDE_WEB_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 underline underline-offset-4"
                >
                  Open web app
                  <ArrowSquareOut size={15} aria-hidden />
                </a>
              </div>
            </article>
            <div className="rounded-md border border-amber-200/20 bg-amber-100/[0.06] p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-md bg-white p-2">
                    <img
                      src={pulseLogo}
                      title="Pulse Health Assistant logo"
                      id="MealPrepLogo"
                      alt="Pulse Health Assistant logo"
                      className="max-h-12 object-contain"
                    />
                  </span>
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-amber-100">Mobile app</div>
                    <div className="mt-1 text-2xl font-semibold text-white">Pulse Health Assistant</div>
                  </div>
                </div>
                <a
                  href={PULSE_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit"
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
              </div>
              <p className="mt-5 leading-7 text-zinc-300">A mobile app for planning around personal health goals.</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm text-zinc-500">Coming soon to Android</span>
                <a
                  href={PULSE_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 underline underline-offset-4"
                >
                  Learn more
                  <ArrowSquareOut size={15} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">Toolkit</div>
            <h2 className="mt-2 text-3xl font-semibold text-white">Tools I use to ship reliable systems</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              I choose boring, dependable technology where possible and focus the complexity on the business problem.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {capabilitiesAndStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-cyan-200">GitHub</div>
            <h2 className="mt-2 text-3xl font-semibold text-white">Public projects</h2>
          </div>
          <div className="text-sm text-zinc-500">
            {projectsLoading
              ? 'Syncing from GitHub'
              : projectsError
                ? 'GitHub unavailable'
                : `${ownedProjects.length} owned public repos`}
          </div>
        </div>
        {projectsLoading ? (
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5 text-zinc-300">
            Loading projects from GitHub...
          </div>
        ) : projectsError ? (
          <div className="rounded-md border border-red-300/20 bg-red-500/10 p-5 text-red-100">{projectsError}</div>
        ) : projects.length > 0 ? (
          <>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{ m: 0, width: '100%' }}>
              {ownedProjects.map(renderProjectCard)}
            </Masonry>
            {contributedProjects.length > 0 ? (
              <div className="mt-10">
                <h3 className="mb-4 text-xl font-semibold text-white">Other projects I have contributed to</h3>
                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{ m: 0, width: '100%' }}>
                  {contributedProjects.map(renderProjectCard)}
                </Masonry>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-md border border-white/10 bg-white/[0.035] p-5 text-zinc-300">
            No public projects found.
          </div>
        )}
      </section>
    </>
  )
}

export default Home
