import { ArrowsClockwise, PersonSimpleBike } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

type BikeRack = {
  distance: string
  latitude: string
  longitude: string
  boroname?: string
  onstreet?: string
  side_of_st?: string
  ifoaddress?: string
  fromstreet?: string
  tostreet?: string
  racktype?: string
}

const BikeRackLocator = () => {
  const [loading, setLoading] = useState(false)
  const [bikeRacks, setBikeRacks] = useState<BikeRack[]>([])
  const [location, setLocation] = useState<{ lat: number; long: number; acc: number }>({ lat: 0, long: 0, acc: 0 })

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }

  function success(pos: { coords: any }) {
    const crd = pos.coords
    setLocation({ lat: crd.latitude, long: crd.longitude, acc: crd.accuracy })
    fetchBikeRacks(crd.latitude, crd.longitude, 500)
  }

  function error(err: { code: any; message: any }) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
    setLoading(false)
  }

  const fetchBikeRacks = async (lat: String, long: String, radius: number) => {
    const response = await fetch(
      `https://data.cityofnewyork.us/resource/592z-n7dk.json?$where=within_circle(the_geom, ${lat}, ${long}, ${radius})&$select=distance_in_meters(the_geom, 'POINT(${long} ${lat})') AS distance, boroname, ifoaddress, onstreet, fromstreet, tostreet, side_of_st, racktype, latitude, longitude&$order=distance ASC&$limit=10`
    )

    const data = await response.json()
    setBikeRacks(data)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setBikeRacks([])
    navigator.geolocation.getCurrentPosition(success, error, options)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-8">
        <div>
          Simple webapp for me to find the nearest bike rack in the five boroughs using{' '}
          <a
            href="https://data.cityofnewyork.us/Transportation/Bicycle-Parking/592z-n7dk/about_data"
            target="_blank"
            className="underline underline-offset-2"
          >
            NYC OpenData
          </a>
          .
        </div>
        <div className="my-6 border" />
        <div className="pb-6 text-2xl">Nearest Bike Racks</div>
        <div className="flex items-end justify-between gap-4">
          <div className="text-lg">
            You are currently at{' '}
            <a
              className="underline underline-offset-2"
              href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}
              target="_blank"
            >
              {location.lat.toFixed(4)}, {location.long.toFixed(4)}
            </a>{' '}
            with an accuracy of {location.acc.toFixed(0)} meters.
          </div>
          <button
            className="flex items-center justify-center gap-2 rounded-full bg-slate-600 px-4 py-2"
            onClick={() => {
              setLoading(true)
              setBikeRacks([])
              navigator.geolocation.getCurrentPosition(success, error, options)
            }}
          >
            <ArrowsClockwise size={24} />
          </button>
        </div>
        <div className="mt-4 flex h-96 flex-col gap-4 overflow-y-scroll">
          {loading ? (
            <div className="flex h-96 animate-bounce items-center justify-center">
              <PersonSimpleBike size={64} />
            </div>
          ) : bikeRacks.length === 0 ? (
            <div className="rounded-md bg-slate-700 p-4">No bike racks found within 500 meters. Bummer!</div>
          ) : (
            bikeRacks.map((bikeRack, index) => (
              <div key={index} className="m-2 rounded-md bg-slate-700 p-4">
                <a
                  className="underline underline-offset-2"
                  href={`https://www.google.com/maps/search/?api=1&query=${bikeRack.latitude},${bikeRack.longitude}`}
                  target="_blank"
                >
                  {bikeRack.ifoaddress} in {bikeRack.boroname}
                </a>
                <div className="mt-4 flex flex-wrap gap-4">
                  {[
                    `${parseFloat(bikeRack.distance).toFixed(0)} meters away (about ${(parseFloat(bikeRack.distance) * 0.012).toFixed(0)} min)`,
                    bikeRack.onstreet ? `On ${bikeRack.onstreet}` : null,
                    bikeRack.fromstreet && bikeRack.tostreet
                      ? `Between ${bikeRack.fromstreet} and ${bikeRack.tostreet}`
                      : null,
                    bikeRack.side_of_st ? `${bikeRack.side_of_st} side of the street` : null,
                    bikeRack.racktype,
                  ].map(
                    (line, index) =>
                      line && (
                        <div key={index} className="rounded-full bg-slate-500 px-4 py-2">
                          {line}
                        </div>
                      )
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-4 py-4">
          <button
            className="rounded-full bg-emerald-600 px-4 py-2"
            onClick={() => window.open('https://portal.311.nyc.gov/article/?kanumber=KA-02576', '_blank')}
          >
            Request a bike rack
          </button>
          <button
            className="rounded-full bg-red-500 px-4 py-2"
            onClick={() => window.open('https://portal.311.nyc.gov/article/?kanumber=KA-01072', '_blank')}
          >
            Report a bike rack issue
          </button>
          <button
            className="rounded-full bg-orange-400 px-4 py-2"
            onClick={() => window.open('https://portal.311.nyc.gov/article/?kanumber=KA-02218', '_blank')}
          >
            Report abandoned bike
          </button>
        </div>
      </div>
    </div>
  )
}

export default BikeRackLocator
