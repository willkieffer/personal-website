import React from "react"
import { Link } from "react-router-dom"
import { Grid, Stack, Typography } from "@mui/material"
import trevor from "./assets/The_Trevor_Project_Logo_2022.svg_.png"
import nycares from "./assets/new-york-cares-logo-1024x348.jpg"
import googleMaps from "./assets/google-maps-logo-4-1.png"

const Personal = () => {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="h5">Links</Typography>
      <Link
        to="https://www.thetrevorproject.org/"
        target="_blank"
        style={{ textDecoration: "none", color: "black" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{
            p: 1,
            m: 0,
            mr: 1,
            border: "3px solid #ff5a3b",
            borderRadius: "12px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <img src={trevor} alt="Trevor" style={{ maxWidth: "250px", objectFit: "contain" }} />
          <Typography textAlign="center" maxWidth="500px">
            The Trevor Project is a leading suicide prevention and crisis intervention nonprofit
            organization for LGBTQ young people 123. They provide information and support to LGBTQ
            young people 24/7, all year round.
          </Typography>
        </Grid>
      </Link>
      <Link
        to="https://www.newyorkcares.org/"
        target="_blank"
        style={{ textDecoration: "none", color: "black" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{
            p: 3,
            m: 0,
            mr: 1,
            width: "100%",
            border: "3px solid red",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <img
            src={nycares}
            alt="NYCares"
            style={{ maxWidth: "250px", objectFit: "contain", marginBottom: "10px" }}
          />
          <Typography textAlign="center" maxWidth="500px">
            New York Cares is a nonprofit organization that provides volunteer support to more than
            850 nonprofit agencies, public schools, and other charitable organizations throughout
            New York City. Last year, 20,000 caring New Yorkers filled more than 67,000 volunteer
            positions.
          </Typography>
        </Grid>
      </Link>
      <Typography variant="h5">Favorite Restaurants</Typography>
      <Link
        to="https://maps.app.goo.gl/Ajs5CqnpYjxeVvYA8"
        target="_blank"
        style={{ textDecoration: "none", color: "black" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ p: 3, border: "3px solid #4285f4", borderRadius: "12px", cursor: "pointer" }}
        >
          <img
            src={googleMaps}
            alt="GoogleMaps"
            style={{ maxHeight: "50px", objectFit: "contain" }}
          />
          <Typography textAlign="center">
            A Google Maps list of my favorite restaurants in NYC (recommendations welcome!)
          </Typography>
        </Stack>
      </Link>
      <Typography variant="h5">Spotify Playlists</Typography>
      <Typography variant="p">(Recommendations also welcome!)</Typography>
      <Grid container justifyContent="space-around">
        <Grid item>
          <iframe
            style={{ borderRadius: "12px", maxWidth: "400px", width: "100vh", margin: "10px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1EIUCQjiEWWFBf?utm_source=generator"
            height="400px"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="paraforCuva_Spotify"
          ></iframe>
        </Grid>
        <Grid item>
          <iframe
            style={{ borderRadius: "12px", maxWidth: "400px", width: "100vh", margin: "10px" }}
            src="https://open.spotify.com/embed/playlist/4rZ9QX3JGHVpQx47LvUgfL?utm_source=generator"
            height="400px"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="dailySolution6_Spotify"
          ></iframe>
        </Grid>
      </Grid>
      <Typography variant="h5">Hudson River Bike Path</Typography>
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1C7McU6oNqNmKls_q2K4BjmLt4i4&ehbc=2E312F"
        width="100%"
        height="480px"
        frameBorder="0"
        title="Hudson_River_Bike_Path"
      ></iframe>
      <Typography variant="h5">US National Parks</Typography>
      <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1FT1dHt-LiJSoiXZW8l0M4XRKVF0oZDU&ehbc=2E312F"
        width="100%"
        height="480px"
        frameBorder="0"
        title="US_National_Parks"
      ></iframe>
    </Stack>
  )
}

export default Personal
