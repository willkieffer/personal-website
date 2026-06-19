import trevor from './assets/The_Trevor_Project_Logo_2022.svg_.png'
import nycares from './assets/new-york-cares-logo-1024x348.jpg'
import googleMaps from './assets/google-maps-logo-4-1.png'

const Personal = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <a href="https://www.thetrevorproject.org/" target="_blank" rel="noopener noreferrer" className="no-underline">
          <div className="flex max-w-96 flex-col items-center justify-center rounded-md border border-orange-300/40 bg-white/[0.035] p-4">
            <img src={trevor} alt="The Trevor Project logo" className="max-w-64 object-contain" />
            <div>
              The Trevor Project is a leading suicide prevention and crisis intervention nonprofit organization for
              LGBTQ young people. They provide information and support 24/7, all year round.
            </div>
          </div>
        </a>
        <a href="https://www.newyorkcares.org/" target="_blank" rel="noopener noreferrer" className="no-underline">
          <div className="flex max-w-96 flex-col items-center justify-center rounded-md border border-red-300/40 bg-white/[0.035] p-4">
            <div className="mb-3 rounded-md bg-white p-2">
              <img src={nycares} alt="New York Cares logo" className="max-w-64 object-contain" />
            </div>
            <div>
              New York Cares is a nonprofit organization that provides volunteer support to nonprofit agencies, public
              schools, and other charitable organizations throughout New York City.
            </div>
          </div>
        </a>
      </div>
      <div className="mt-8 text-center text-xl">Empire State Trail Bike Path</div>
      <iframe
        className="rounded-md border border-white/10"
        src="https://www.google.com/maps/d/u/0/embed?mid=1oUux_du-VEvSwa-UspgJlHtLg6iCiNc&ehbc=2E312F"
        width="100%"
        height="480"
        loading="lazy"
        title="Empire State Trail bike path map"
      />
      <div className="mt-8 text-center text-xl">US National Parks Bucket List</div>
      <iframe
        className="rounded-md border border-white/10"
        src="https://www.google.com/maps/d/u/0/embed?mid=1FT1dHt-LiJSoiXZW8l0M4XRKVF0oZDU&ehbc=2E312F"
        width="100%"
        height="480"
        loading="lazy"
        title="US National Parks bucket list map"
      />
      <div className="text-center">
        Create your own maps with{' '}
        <a
          href="https://www.google.com/maps/d/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Google My Maps
        </a>
      </div>
      <div className="mt-8 text-center text-xl">Some of My Favorite Restaurants</div>
      <a
        href="https://maps.app.goo.gl/Ajs5CqnpYjxeVvYA8"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <div className="flex items-center justify-center gap-6 rounded-md border border-blue-300/40 bg-white/[0.035] p-6">
          <img src={googleMaps} alt="Google Maps logo" className="max-h-12 object-contain" />
          <div className="text-center">
            A Google Maps list of my favorite restaurants in NYC <br /> (recommendations always welcome!)
          </div>
        </div>
      </a>
      <div className="mt-8 text-center text-xl">Some Spotify Playlists</div>
      <div className="text-center">
        Recommendations also always welcome! <br /> For more fantastic music,{' '}
        <a
          href="https://open.spotify.com/user/willkmusic?si=cbc8a7c942d245eb"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          visit my profile
        </a>{' '}
        :)
      </div>
      <div className="flex flex-wrap justify-around gap-4">
        <iframe
          className="w-full max-w-[400px] rounded-md"
          src="https://open.spotify.com/embed/playlist/37i9dQZF1EIUCQjiEWWFBf?utm_source=generator"
          height="400"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Para for Cuva Spotify playlist"
        />
        <iframe
          className="w-full max-w-[400px] rounded-md"
          src="https://open.spotify.com/embed/playlist/4rZ9QX3JGHVpQx47LvUgfL?utm_source=generator"
          height="400"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Daily Solution 6 Spotify playlist"
        />
      </div>
    </section>
  )
}

export default Personal
