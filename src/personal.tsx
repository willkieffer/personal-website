import { Link } from 'react-router-dom'
import trevor from './assets/The_Trevor_Project_Logo_2022.svg_.png'
import nycares from './assets/new-york-cares-logo-1024x348.jpg'
import googleMaps from './assets/google-maps-logo-4-1.png'

const Personal = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-center text-xl">Links You Should Check Out</div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Link to="https://www.thetrevorproject.org/" target="_blank" style={{ textDecoration: 'none' }}>
          <div className="flex max-w-96 flex-col items-center justify-center rounded-lg border-2 border-orange-600 p-4">
            <img src={trevor} alt="Trevor" style={{ maxWidth: '250px', objectFit: 'contain' }} />
            <div>
              The Trevor Project is a leading suicide prevention and crisis intervention nonprofit organization for
              LGBTQ young people 123. They provide information and support to LGBTQ young people 24/7, all year round.
            </div>
          </div>
        </Link>
        <Link to="https://www.newyorkcares.org/" target="_blank" style={{ textDecoration: 'none' }}>
          <div className="flex max-w-96 flex-col items-center justify-center rounded-lg border-2 border-red-600 p-4">
            <img
              src={nycares}
              alt="NYCares"
              style={{ maxWidth: '250px', objectFit: 'contain', marginBottom: '10px' }}
            />
            <div>
              New York Cares is a nonprofit organization that provides volunteer support to more than 850 nonprofit
              agencies, public schools, and other charitable organizations throughout New York City. Last year, 20,000
              caring New Yorkers filled more than 67,000 volunteer positions.
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-8 text-center text-xl">Some of My Favorite Restaurants</div>
      <Link to="https://maps.app.goo.gl/Ajs5CqnpYjxeVvYA8" target="_blank" style={{ textDecoration: 'none' }}>
        <div className="flex items-center justify-center gap-6 rounded-lg border-2 border-blue-700 p-6">
          <img src={googleMaps} alt="GoogleMaps" style={{ maxHeight: '50px', objectFit: 'contain' }} />
          <div>A Google Maps list of my favorite restaurants in NYC (recommendations welcome!)</div>
        </div>
      </Link>
      <div className="mt-8 text-center text-xl">Some Spotify Playlists</div>
      <div className="text-center">(Recommendations also welcome!)</div>
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
      <div className="mt-8 text-center text-xl">Hudson River Bike Path</div>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1C7McU6oNqNmKls_q2K4BjmLt4i4&ehbc=2E312F"
        width="100%"
        height="480px"
        title="Hudson_River_Bike_Path"
      ></iframe>
      <div className="mt-8 text-center text-xl">US National Parks Bucket List</div>
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1FT1dHt-LiJSoiXZW8l0M4XRKVF0oZDU&ehbc=2E312F"
        width="100%"
        height="480px"
        title="US_National_Parks"
      ></iframe>
    </div>
  )
}

export default Personal
