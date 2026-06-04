import { ArrowsClockwise, PersonSimpleBike } from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'

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

type Location = {
  lat: number
  long: number
  acc: number
}

const SEARCH_RADIUS_METERS = 500

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

const getGeolocationErrorMessage = (error: GeolocationPositionError) => {
  if (error.code === error.PERMISSION_DENIED)
    return 'Location access was denied. Enable location access to find nearby bike racks.'
  if (error.code === error.POSITION_UNAVAILABLE) return 'Your current location is unavailable right now.'
  if (error.code === error.TIMEOUT) return 'Finding your location timed out. Try refreshing the search.'
  return 'There was a problem finding your current location.'
}

const isAbortError = (error: unknown) => error instanceof DOMException && error.name === 'AbortError'

const BikeRackLocator = () => {
  const [loading, setLoading] = useState(false)
  const [bikeRacks, setBikeRacks] = useState<BikeRack[]>([])
  const [location, setLocation] = useState<Location | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fetchBikeRacks = useCallback(async (lat: number, long: number, radius: number, signal?: AbortSignal) => {
    const params = new URLSearchParams({
      $where: `within_circle(the_geom, ${lat}, ${long}, ${radius})`,
      $select:
        "distance_in_meters(the_geom, 'POINT(" +
        `${long} ${lat}` +
        ")') AS distance, boroname, ifoaddress, onstreet, fromstreet, tostreet, side_of_st, racktype, latitude, longitude",
      $order: 'distance ASC',
      $limit: '10',
    })

    const response = await fetch(`https://data.cityofnewyork.us/resource/592z-n7dk.json?${params.toString()}`, {
      signal,
    })
    if (!response.ok) throw new Error(`NYC OpenData returned ${response.status}`)

    const data = (await response.json()) as BikeRack[]
    setBikeRacks(data)
  }, [])

  const requestLocation = useCallback(
    (signal?: AbortSignal) => {
      if (!navigator.geolocation) {
        setErrorMessage('Geolocation is not available in this browser.')
        return
      }

      setLoading(true)
      setBikeRacks([])
      setErrorMessage(null)

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (signal?.aborted) return

          const { latitude, longitude, accuracy } = pos.coords
          setLocation({ lat: latitude, long: longitude, acc: accuracy })

          fetchBikeRacks(latitude, longitude, SEARCH_RADIUS_METERS, signal)
            .catch((fetchError) => {
              if (!isAbortError(fetchError)) {
                setBikeRacks([])
                setErrorMessage('There was a problem loading nearby bike racks from NYC OpenData.')
              }
            })
            .finally(() => {
              if (!signal?.aborted) setLoading(false)
            })
        },
        (error) => {
          if (signal?.aborted) return

          setErrorMessage(getGeolocationErrorMessage(error))
          setLoading(false)
        },
        geolocationOptions
      )
    },
    [fetchBikeRacks]
  )

  useEffect(() => {
    const controller = new AbortController()
    requestLocation(controller.signal)

    return () => controller.abort()
  }, [requestLocation])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-8">
        <div>
          Simple webapp for me to find the nearest bike rack in the five boroughs using{' '}
          <a
            href="https://data.cityofnewyork.us/Transportation/Bicycle-Parking/592z-n7dk/about_data"
            target="_blank"
            rel="noopener noreferrer"
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
            {location ? (
              <>
                You are currently at{' '}
                <a
                  className="underline underline-offset-2"
                  href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {location.lat.toFixed(4)}, {location.long.toFixed(4)}
                </a>{' '}
                with an accuracy of {location.acc.toFixed(0)} meters.
              </>
            ) : (
              'Finding your location...'
            )}
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-full bg-slate-600 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => requestLocation()}
            disabled={loading}
            aria-label="Refresh bike rack search"
            title="Refresh"
          >
            <ArrowsClockwise size={24} aria-hidden />
          </button>
        </div>
        {errorMessage ? <div className="mt-4 rounded-md bg-red-900/60 p-4">{errorMessage}</div> : null}
        <div className="mt-4 flex h-96 flex-col gap-4 overflow-y-auto">
          {loading ? (
            <div className="flex h-96 animate-bounce items-center justify-center">
              <PersonSimpleBike size={64} aria-label="Loading nearby bike racks" />
            </div>
          ) : !errorMessage && bikeRacks.length === 0 ? (
            <div className="rounded-md bg-slate-700 p-4">No bike racks found within 500 meters. Bummer!</div>
          ) : (
            bikeRacks.map((bikeRack) => (
              <div
                key={`${bikeRack.latitude}-${bikeRack.longitude}-${bikeRack.distance}`}
                className="m-2 rounded-md bg-slate-700 p-4"
              >
                <a
                  className="underline underline-offset-2"
                  href={`https://www.google.com/maps/search/?api=1&query=${bikeRack.latitude},${bikeRack.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {bikeRack.ifoaddress ?? 'Bike rack'} in {bikeRack.boroname ?? 'NYC'}
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
                  ].map((line) =>
                    line ? (
                      <div key={line} className="rounded-full bg-slate-500 px-4 py-2">
                        {line}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-4 py-4">
          <a
            className="rounded-full bg-emerald-600 px-4 py-2"
            href="https://portal.311.nyc.gov/article/?kanumber=KA-02576"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a bike rack
          </a>
          <a
            className="rounded-full bg-red-500 px-4 py-2"
            href="https://portal.311.nyc.gov/article/?kanumber=KA-01072"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report a bike rack issue
          </a>
          <a
            className="rounded-full bg-orange-400 px-4 py-2"
            href="https://portal.311.nyc.gov/article/?kanumber=KA-02218"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report abandoned bike
          </a>
        </div>
      </div>
    </div>
  )
}

export default BikeRackLocator
