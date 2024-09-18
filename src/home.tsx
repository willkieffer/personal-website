import { useEffect, useState } from 'react'
import linkedinphoto from './assets/linkedinphoto.png'
import logoTransparent from './assets/logoTransparent.png'
import ReactMarkdown from 'react-markdown'
import Masonry from '@mui/lab/Masonry'
import { AppleLogo, Archive, GitBranch, GooglePlayLogo, Lock } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import verdeLogo from './assets/logoTransparentVerde.png'

type Project = {
  id: number
  name: string
  description: string
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

const Home = () => {
  const [markdownFile, setMarkdownFile] = useState<string | null>()
  const [activeProject, setActiveProject] = useState<Project | null>()
  const [projects, setProjects] = useState<Project[]>([])
  const [mealPrepPhoto1, setMealPrepPhoto1] = useState<string>()
  const [mealPrepPhoto2, setMealPrepPhoto2] = useState<string>()
  const [mealPrepPhoto3, setMealPrepPhoto3] = useState<string>()
  const [mealPrepPhoto4, setMealPrepPhoto4] = useState<string>()
  const [mealPrepPhoto5, setMealPrepPhoto5] = useState<string>()

  useEffect(() => {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`)

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    }

    if (!projects.length)
      fetch('https://api.github.com/user/repos', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (!Array.isArray(result)) throw new Error('Not an array')
          setProjects(result)
        })
        .catch((error) => console.error('error', error))

    if (!mealPrepPhoto1)
      fetch(
        'https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepAssistant_January2024Update_Screenshot (1).jpg'
      )
        .then((response) => response.blob())
        .then((result) => setMealPrepPhoto1(URL.createObjectURL(result)))

    if (!mealPrepPhoto2)
      fetch(
        'https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepAssistant_January2024Update_Screenshot (2).jpg'
      )
        .then((response) => response.blob())
        .then((result) => setMealPrepPhoto2(URL.createObjectURL(result)))

    if (!mealPrepPhoto3)
      fetch(
        'https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepAssistant_January2024Update_Screenshot (3).jpg'
      )
        .then((response) => response.blob())
        .then((result) => setMealPrepPhoto3(URL.createObjectURL(result)))

    if (!mealPrepPhoto4)
      fetch(
        'https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepAssistant_January2024Update_Screenshot (4).jpg'
      )
        .then((response) => response.blob())
        .then((result) => setMealPrepPhoto4(URL.createObjectURL(result)))

    if (!mealPrepPhoto5)
      fetch(
        'https://personalwebsiteresume.blob.core.windows.net/resume/MealPrepAssistant_January2024Update_Screenshot (5).jpg'
      )
        .then((response) => response.blob())
        .then((result) => setMealPrepPhoto5(URL.createObjectURL(result)))
  })

  useEffect(() => {
    const fetchReadMe = async () => {
      try {
        const response = await fetch(activeProject!.url + '/readme')
        if (!response.ok) throw new Error('No ReadMe')
        const download = await fetch((await response.json()).download_url)
        setMarkdownFile(await download.text())
      } catch (e) {
        console.log(e)
      }
    }
    if (activeProject) fetchReadMe()
    else setMarkdownFile(null)
  }, [activeProject])

  return (
    <>
      {activeProject && (
        <>
          <div
            onClick={() => setActiveProject(null)}
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-50"
          ></div>
          <div
            className="fixed left-1/2 top-1/2 z-50 overflow-y-scroll rounded-lg border-2 border-black bg-gray-900 p-2 shadow-2xl"
            style={{ transform: 'translate(-50%, -50%)', maxHeight: '80vh', maxWidth: '80vw' }}
          >
            {activeProject && (
              <div className="flex flex-col gap-2 p-2">
                <div className="text-lg" color="primary">
                  {activeProject.name}
                </div>
                {activeProject.archived ? (
                  <div className="flex w-min justify-center rounded-full bg-gray-600 px-4 py-2">Archived</div>
                ) : (
                  <div>Last Active: {new Date(activeProject.updated_at).toDateString()}</div>
                )}
                <div className="italic">{activeProject.description ?? 'No Description Provided'}</div>
                <button
                  disabled={activeProject.private}
                  onClick={() => window.open(activeProject.html_url, '_blank')}
                  className="rounded-lg bg-gray-700 p-2"
                >
                  {activeProject.private ? 'Repo is Private' : 'View Project on GitHub'}
                </button>
                {markdownFile ? (
                  <>
                    <div className="text-lg" color="primary">
                      ReadMe.md
                    </div>
                    <ReactMarkdown children={markdownFile} />
                  </>
                ) : (
                  <div className="italic">Could not locate readme</div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      <div className="flex flex-col items-center justify-center gap-4 p-6 sm:flex-row">
        <img src={linkedinphoto} title="Headshot" id="headshot" alt="headshot" width={150} height={150} />
        <div className="max-w-screen-md select-none text-center">
          Hey! I'm William Kieffer, a software engineer based in NYC. I graduated from Columbia University with a
          Bachelor's degree in Computer Science, and I'm spending my time both searching for a job and working on Verde
          Financial—a personal finance startup designed to simplify budgeting and debt management. This website
          showcases my resume, links to my social accounts, and some of the other projects that I've been working on in
          my free time. Feel free to drop me an email with any questions or comments, or just to say hello!
        </div>
      </div>
      <Link to="https://www.verdefinancialapp.com" target="_blank">
        <div className="flex items-center justify-center gap-4 bg-green-800 p-8 text-center text-2xl">
          <img src={verdeLogo} alt="verdeLogo" width={50} />
          <div>Learn More about Verde Financial</div>
        </div>
      </Link>
      <div className="p-4 text-center text-2xl">Personal Project Spotlight</div>
      <div className="flex flex-col items-center justify-around gap-4 bg-[#fde6ca] p-8 text-center text-2xl text-black md:flex-row">
        <div className="flex w-max flex-col items-center justify-center gap-2 rounded-lg p-4">
          <img src={logoTransparent} title="MealPrepLogo" id="MealPrepLogo" alt="MealPrepLogo" width={75} height={75} />
          <div>Pulse Health Assistant</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-xl">Build a plan to reach your health goals.</div>
          <div>Coming soon to Android and iOS.</div>
          {/* <div className="mt-2 flex items-center justify-center gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-lg">
              <AppleLogo size={24} />
              App Store
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-lg">
              <GooglePlayLogo size={24} />
              Google Play
            </button>
          </div> */}
        </div>
      </div>
      <div className="p-4 text-center text-lg">Technologies</div>
      <div className="flex flex-wrap justify-center gap-3 px-4">
        {[
          'Flutter',
          'AWS Amplify',
          'AWS AppSync',
          'AWS DynamoDB',
          'AWS Cognito',
          'AWS Lambda',
          'GraphQL',
          'OpenAI',
          'Google Cloud Platform',
          'Signin with Apple',
          'Push Notifications',
          'Microsoft Graph',
        ]
          .sort(() => Math.random() - 0.5)
          .map((tech) => (
            <div key={tech} className="rounded-full bg-gray-700 px-4 py-2">
              {tech}
            </div>
          ))}
      </div>
      <div className="m-8 border" />
      <div className="flex flex-col items-center justify-center">
        {projects.length > 0 ? (
          <>
            <div className="p-4 text-center text-lg">My Current Projects (from GitHub)</div>
            <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ pl: 2, pr: 2 }}>
              {projects
                .filter((project) => project.owner.login === 'willkieffer')
                .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                .map((project) => {
                  return (
                    <div className="flex flex-col">
                      {project.archived || project.private || project.fork ? (
                        <div className="mx-4 flex w-min gap-2 rounded-t-lg bg-gray-600 p-2">
                          {project.archived && <Archive weight="duotone" />}
                          {project.private && <Lock weight="duotone" />}
                          {project.fork && <GitBranch weight="duotone" />}
                        </div>
                      ) : null}
                      <div
                        key={project.id}
                        className={`${project.private ? '' : 'cursor-pointer'} ${project.archived ? 'bg-gray-600' : 'bg-gray-700'} relative flex select-none flex-col rounded-md p-2`}
                        onClick={() => setActiveProject(project.private ? null : project)}
                      >
                        <div className="text-lg" color="primary">
                          {project.name}
                        </div>
                        {!project.archived && (
                          <div className="text-sm">Updated {new Date(project.updated_at).toDateString()}</div>
                        )}
                        <div className="pt-2">{project.description}</div>
                      </div>
                    </div>
                  )
                })}
            </Masonry>
            <div className="p-4 text-center text-lg">Other Projects I've Contributed To</div>
            <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ pl: 2, pr: 2 }}>
              {projects
                .filter((project) => project.owner.login !== 'willkieffer')
                .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                .map((project) => {
                  return (
                    <div
                      key={project.id}
                      className={`${project.private ? '' : 'cursor-pointer'} ${project.archived ? 'bg-gray-600' : 'bg-gray-700'} relative flex select-none flex-col rounded-md p-2`}
                      onClick={() => setActiveProject(project.private ? null : project)}
                    >
                      <div className="absolute right-0 top-0 m-2 flex gap-2">
                        {project.archived && <Archive weight="duotone" color="grey" />}
                        {project.private && <Lock weight="duotone" color="grey" />}
                        {project.fork && <GitBranch weight="duotone" color="grey" />}
                      </div>
                      <div className="text-lg" color="primary">
                        {project.name}
                      </div>
                      {!project.archived && (
                        <div className="text-sm">Updated {new Date(project.updated_at).toDateString()}</div>
                      )}
                      <div className="pt-2">{project.description}</div>
                    </div>
                  )
                })}
            </Masonry>
          </>
        ) : (
          <div className="text-center">There was a problem fetching from GitHub</div>
        )}
      </div>
    </>
  )
}

export default Home
