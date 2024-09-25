import { ArrowUp, House } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PulsePrivacy() {
  const [scrollY, setScrollY] = useState(window.scrollY)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div id="top" className={`flex items-center justify-between p-8`}>
        <div className="m-2 items-center text-4xl">Pulse Health Assistant</div>
      </div>
      <div>
        <div className="p-8">
          <h1 className="p-4 text-center text-2xl font-normal">Privacy Policy</h1>
          <h2 className="p-2 text-xl font-light">Data Storage</h2>
          <p className="pl-2">
            When you create and user your account, all of the information you add is encrypted both on our servers and
            in transit to your device.
          </p>
          <h2 className="p-2 text-xl font-light">Monitization</h2>
          <p className="pl-2">
            Your data is NEVER sold to third parties or advertisers. If you opt-in to targeted ads through Google, they
            are based on your Google account information and never your data in our app. Neither Google nor Apple have
            access to any data stored in our app, regardless of which sign-in method you choose.
          </p>
          <h2 className="p-2 text-xl font-light">Access to Camera</h2>
          <p className="pl-2">
            If granted permission, the camera is used for two separate functions: 1) To scan nutrition labels and images
            of meals to estimate ingredients and nutrients and 2) For recipe photos. <br />
            In the first case, the images are securely sent to OpenAI for processing. OpenAI does not store these
            photos, and they are not used for the training of future models. OpenAI's privacy policy can be found{' '}
            <a href="https://openai.com/policies/row-privacy-policy/" className="underline underline-offset-2">
              here
            </a>
            . <br />
            In the second case, the images are stored securely on our servers and displayed with your recipes. The
            camera is never accessed without your permission and is never used for any other purpose.
          </p>
          <h2 className="p-2 text-xl font-light">Deleting your data</h2>
          <p className="pl-2">
            You can immediately delete your account and all associated data at any time by going to the settings page.
          </p>
          <h2 className="p-2 text-xl font-light">Google Account Data</h2>
          <p className="pl-2">
            If you choose to sign in with Google, we access and store some of your publicly available Google account
            information such as your name. This information is never used for any purpose other than to identify you
            within our app (never shared with third parties) and can be deleted at any time by deleting your account.
          </p>
          <h2 className="p-2 text-xl font-light">Apple Account Data</h2>
          <p className="pl-2">
            We use Sign in With Apple, and implement all of the required privacy technology built with it. If you choose
            to sign in with Apple, we only see the custom name and information you have set. This information can be
            changed in you apple account and can be deleted at any time by deleting your account.
          </p>
        </div>
        <div className="p-8">
          <h1 className="p-4 text-center text-2xl font-normal">Data Policy</h1>

          <h2 className="p-2 text-xl font-light">Purpose</h2>
          <p className="pl-2">
            The purpose of this policy is to define clear guidelines for the retention and deletion of data within Pulse
            Health Assistant. Our commitment is to safeguard sensitive information while adhering to legal requirements.
            We comply with all relevant data privacy laws, including the General Data Protection Regulation (GDPR) and
            state-specific regulations.
          </p>

          <h2 className="p-2 text-xl font-light">Data Retention Periods</h2>
          <p className="pl-2">
            We retain all data inputted and saved in the app for the duration of user enrollment in account services,
            unless it is deleted by the user.
          </p>

          <h2 className="p-2 text-xl font-light">Data Deletion</h2>
          <p className="pl-2">
            Data and account deletion can be requested by the user at any time, to be completed immediately.
          </p>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {scrollY > 0 && (
          <a href="#top">
            <div className="rounded-full border border-gray-500 bg-white p-4">
              <ArrowUp size={24} weight="thin" className="text-black" />
            </div>
          </a>
        )}
        <Link to="/">
          <div className="rounded-full border border-gray-500 bg-white p-4">
            <House size={24} weight="thin" className="text-black" />
          </div>
        </Link>
      </div>
    </>
  )
}
