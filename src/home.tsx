import { useEffect, useState } from 'react'
import linkedinphoto from './assets/linkedinphoto.png'
import logoTransparent from './assets/logoTransparent.png'
import ReactMarkdown from 'react-markdown'
import Masonry from '@mui/lab/Masonry'
import { Lock } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import verdeLogo from './assets/logoTransparentVerde.png'

type Project = {
  id: number
  name: string
  description: string
  url: string
  private: boolean
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
            className="fixed left-1/2 top-1/2 z-50 overflow-y-scroll rounded-lg border-2 border-black bg-white p-2 shadow-2xl dark:bg-gray-900"
            style={{ transform: 'translate(-50%, -50%)', maxHeight: '80vh', maxWidth: '80vw' }}
          >
            {activeProject && (
              <div className="flex flex-col gap-2 p-2">
                <div className="text-lg" color="primary">
                  {activeProject.name}
                </div>
                <div>
                  {activeProject.private ? 'Created At' : 'Last Active'}:{' '}
                  {new Date(activeProject.updated_at).toDateString()}
                </div>
                <div className="italic">{activeProject.description ?? 'No Description Provided'}</div>
                <button
                  disabled={activeProject.private}
                  onClick={() => window.open(activeProject.html_url, '_blank')}
                  className="rounded-lg bg-gray-400 p-2 dark:bg-gray-700"
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
          Hey! I’m William Kieffer, a software engineer based in NYC. I’ve recently graduated from Columbia University
          with a Bachelor's degree in Computer Science, and I’m spending my time both searching for a job and working on
          Verde Financial—a personal finance startup designed to simplify budgeting and debt management. This website
          showcases my resume, links to my social accounts, and some of the other projects that I’ve been working on in
          my free time. Feel free to drop me an email with any questions or comments, or just to say hello!
        </div>
      </div>
      <Link to="https://www.verdefinancialapp.com" target="_blank">
        <div className="flex items-center justify-center gap-4 bg-green-800 p-8 text-center text-2xl">
          <img src={verdeLogo} alt="verdeLogo" width={50} />
          <div>Learn More about Verde Financial</div>
        </div>
      </Link>
      <div className="p-4 text-center text-2xl">Project Spotlight</div>
      <div className="sm:items-normal flex flex-col items-center sm:flex-row">
        <div className="flex w-full flex-col items-center gap-4 p-2 sm:w-1/2">
          <div className="flex w-max flex-col items-center justify-center gap-2 rounded-lg bg-gray-400 p-4 dark:bg-gray-700">
            <img
              src={logoTransparent}
              title="MealPrepLogo"
              id="MealPrepLogo"
              alt="MealPrepLogo"
              width={75}
              height={75}
            />
            <div className="text-xl">Meal Prep Assistant</div>
          </div>
          <div className="flex w-full flex-col gap-2 rounded-lg bg-slate-400 p-4 dark:bg-gray-700">
            <div className="text-center text-lg">Features</div>
            <div>
              📅 Set weekly meal plans and workouts <br />
            </div>
            <div>
              🍱 Create and edit meals and recipes <br />
            </div>
            <div>
              🥡 Add one-off meals for restaurants, leftovers, or takeout <br />
            </div>
            <div>
              ✨ Use generative AI for ideas, ingredients, and recipes <br />
            </div>
            <div>
              📊 Set goals and track nutrients that matter to you <br />
            </div>
            <div>📋 Export grocery lists to Microsoft To Do</div>
          </div>
          <div className="flex w-full flex-col gap-2 rounded-lg bg-slate-400 p-4 dark:bg-gray-700">
            <div className="text-center text-lg">✨New Features in January 2024 Update✨</div>
            <div>💧 Hourly hydration reminder push notifications</div>
            <div>📈 New graph designs to display more nutrients</div>
            <div>🔢 Import nutrition data from the USDA FoodCentral Database</div>
            <div>🐛 Offline support + bug fixes and stability improvements!</div>
          </div>
        </div>
        <div className="m-2 flex h-min w-full items-center gap-4 overflow-x-scroll rounded-lg bg-gray-400 p-2 sm:w-1/2 dark:bg-gray-700">
          <iframe
            title="Meal Prep Assistant - January 2024 Update"
            id="MealPrepVideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
            loading="lazy"
            allowFullScreen
            src="https://www.youtube.com/embed/V2bWShf3WXQ"
          ></iframe>
          <img src={mealPrepPhoto2} alt="mealPrepPhoto2" width={300} style={{ objectFit: 'contain' }} />
          <img src={mealPrepPhoto3} alt="mealPrepPhoto3" width={300} style={{ objectFit: 'contain' }} />
          <img src={mealPrepPhoto5} alt="mealPrepPhoto2" width={300} style={{ objectFit: 'contain' }} />
          <img src={mealPrepPhoto4} alt="mealPrepPhoto4" width={300} style={{ objectFit: 'contain' }} />
          <img src={mealPrepPhoto1} alt="mealPrepPhoto1" width={300} style={{ objectFit: 'contain' }} />
        </div>
      </div>
      <div className="p-4 text-center text-lg">Technologies Used</div>
      <div className="flex flex-wrap justify-center gap-3 p-4">
        {[
          'React',
          'AWS Amplify',
          'GraphQL',
          'REST',
          'AWS DynamoDB',
          'AWS Cognito',
          'AWS Lambda',
          'OpenAI',
          'Google Cloud Platform',
          'Microsoft Graph',
          'Service Workers',
          'Web-push Notifications',
          'PWA',
        ].map((tech) => (
          <div key={tech} className="rounded-full bg-gray-400 px-4 py-2 dark:bg-gray-700">
            {tech}
          </div>
        ))}
      </div>
      <div className="m-8 flex h-0.5 bg-gray-400 dark:bg-gray-700" />
      {projects.length > 0 ? (
        <>
          <div className="p-4 text-center text-lg">My Current Projects (from GitHub)</div>
          <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2} sx={{ pl: 2, pr: 2 }}>
            {projects
              .filter((project) => project.owner.login === 'willkieffer')
              .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
              .map((project) => {
                return (
                  <div
                    key={project.id}
                    className={`${project.private ? '' : 'cursor-pointer'} relative flex select-none flex-col rounded-md bg-gray-400 p-2 dark:bg-gray-700`}
                    onClick={() => setActiveProject(project.private ? null : project)}
                  >
                    {project.private && (
                      <Lock
                        style={{
                          position: 'absolute',
                          top: '10',
                          right: '10',
                        }}
                        weight="bold"
                        color="grey"
                      />
                    )}
                    <div className="text-lg" color="primary">
                      {project.name}
                    </div>
                    <div>{new Date(project.updated_at).toDateString()}</div>
                    <div>{project.description}</div>
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
                    className={`${project.private ? '' : 'cursor-pointer'} relative flex select-none flex-col rounded-md bg-gray-400 p-2 dark:bg-gray-700`}
                    onClick={() => setActiveProject(project.private ? null : project)}
                  >
                    {project.private && (
                      <Lock
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                        }}
                        weight="bold"
                        color="grey"
                      />
                    )}
                    <div className="text-lg" color="primary">
                      {project.name}
                    </div>
                    <div>{new Date(project.updated_at).toDateString()}</div>
                    <div>{project.description}</div>
                  </div>
                )
              })}
          </Masonry>
        </>
      ) : (
        <div className="text-center">There was a problem fetching from GitHub</div>
      )}
    </>
  )
}

export default Home
