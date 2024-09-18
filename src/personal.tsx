import { Link } from 'react-router-dom'
import trevor from './assets/The_Trevor_Project_Logo_2022.svg_.png'
import nycares from './assets/new-york-cares-logo-1024x348.jpg'
import googleMaps from './assets/google-maps-logo-4-1.png'

const Personal = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="p-4">
        <div>I use this page as a kind of mood board—it's got some of what I'm up to and what's on my to-do list.</div>
        <div className="my-6 border" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Link to="https://www.thetrevorproject.org/" target="_blank" style={{ textDecoration: 'none' }}>
          <div className="flex max-w-96 flex-col items-center justify-center rounded-lg border-2 border-orange-600 p-4">
            <img src={trevor} alt="Trevor" className="max-w-64 object-contain" />
            <div>
              The Trevor Project is a leading suicide prevention and crisis intervention nonprofit organization for
              LGBTQ young people 123. They provide information and support to LGBTQ young people 24/7, all year round.
            </div>
          </div>
        </Link>
        <Link to="https://www.newyorkcares.org/" target="_blank" style={{ textDecoration: 'none' }}>
          <div className="flex max-w-96 flex-col items-center justify-center rounded-lg border-2 border-red-600 p-4">
            <div className="mb-3 rounded-lg bg-white p-2">
              <img src={nycares} alt="NYCares" className="max-w-64 object-contain" />
            </div>
            <div>
              New York Cares is a nonprofit organization that provides volunteer support to more than 850 nonprofit
              agencies, public schools, and other charitable organizations throughout New York City. Last year, 20,000
              caring New Yorkers filled more than 67,000 volunteer positions.
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-8 text-center text-xl">Empire State Trail Bike Path</div>
      <iframe
        className="rounded-lg"
        src="https://www.google.com/maps/d/u/0/embed?mid=1oUux_du-VEvSwa-UspgJlHtLg6iCiNc&ehbc=2E312F"
        width="100%"
        height="480px"
      ></iframe>
      <div className="mt-8 text-center text-xl">US National Parks Bucket List</div>
      <iframe
        className="rounded-lg"
        src="https://www.google.com/maps/d/u/0/embed?mid=1FT1dHt-LiJSoiXZW8l0M4XRKVF0oZDU&ehbc=2E312F"
        width="100%"
        height="480px"
      ></iframe>
      <div className="text-center">
        Create your own maps with{' '}
        <a href="https://www.google.com/maps/d/?hl=en" className="underline underline-offset-2">
          Google My Maps
        </a>
      </div>
      <div className="mt-8 text-center text-xl">Some of My Favorite Restaurants</div>
      <Link to="https://maps.app.goo.gl/Ajs5CqnpYjxeVvYA8" target="_blank" style={{ textDecoration: 'none' }}>
        <div className="flex items-center justify-center gap-6 rounded-lg border-2 border-blue-700 p-6">
          <img src={googleMaps} alt="GoogleMaps" className="max-h-12 object-contain" />
          <div className="text-center">
            A Google Maps list of my favorite restaurants in NYC <br /> (recommendations always welcome!)
          </div>
        </div>
      </Link>
      <div className="mt-8 text-center text-xl">Some Spotify Playlists</div>
      <div className="text-center">
        Recommendations also always welcome! <br /> For more fantastic music,{' '}
        <a href="https://open.spotify.com/user/willkmusic?si=cbc8a7c942d245eb" className="underline underline-offset-2">
          visit my profile
        </a>{' '}
        :)
      </div>
      <div className="flex flex-wrap justify-around gap-4">
        <iframe
          style={{ borderRadius: '12px', maxWidth: '400px', width: '100vh' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1EIUCQjiEWWFBf?utm_source=generator"
          height="400px"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="paraforCuva_Spotify"
        ></iframe>
        <iframe
          style={{ borderRadius: '12px', maxWidth: '400px', width: '100vh' }}
          src="https://open.spotify.com/embed/playlist/4rZ9QX3JGHVpQx47LvUgfL?utm_source=generator"
          height="400px"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="dailySolution6_Spotify"
        ></iframe>
      </div>
    </div>
  )
}

export default Personal
