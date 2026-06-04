# personal-website

Personal website for William Kieffer. The site is a Vite + React + TypeScript app that presents a home page, resume PDF, personal links, and a small NYC bike-rack locator.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- MUI Masonry
- Phosphor Icons

## Local Development

```bash
npm install
npm run dev
```

The app defaults to Vite's local development server, usually `http://localhost:5173`.

## Validation

```bash
npm run lint
npm run build
```

If the global `npm` shim is broken on Windows, run the local binaries directly:

```powershell
.\node_modules\.bin\eslint.cmd . --ext ts,tsx --report-unused-disable-directives --max-warnings 0
.\node_modules\.bin\tsc.cmd -b
.\node_modules\.bin\vite.cmd build
```

## Deployment Notes

The repository includes `staticwebapp.config.json` for Azure Static Web Apps routing. The navigation fallback rewrites client-side routes to `index.html`.

The project list on the home page uses GitHub's public user repositories endpoint, so no client-side GitHub token is required.

## OLD TODO LIST

- Finish updating echo3D graph and tensorflow/spotify
- Upload more current resume
  - Use [resumeworded.com](https://resumeworded.com/) and [VMock](https://www.vmock.com/default/login)
- Integrate design colors (shown on favicon)
- Clean up links page (organize by project?)
- Add movie/tv recommendations

      <Typography variant="h5">Personal Project Examples and Helpful Links</Typography>
      <Typography variant="h6">Resy Bot</Typography>
      <a class="links" href="https://github.com/Alkaar/resy-booking-bot"></a>
      <a class="links" href="https://playwright.dev/docs/intro"></a>
      <a
        class="links"
        href="https://tedboy.github.io/flask/quickstart/quickstart7.html#the-request-object"
      ></a>
      <a class="links" href="https://www.pythonanywhere.com/user/willkieffer/"></a>
      <Typography variant="h6">Person Website Links</Typography>
      <a
        class="links"
        href="https://console.cloud.google.com/apis/dashboard?project=personal-website-map-379820"
      ></a>
      <Typography variant="h6">TensorFlow Links</Typography>
      <a class="links" href="https://www.tensorflow.org/tutorials/quickstart/beginner"></a>
      <a
        class="links"
        href="https://www.tensorflow.org/tutorials/keras/text_classification_with_hub"
      ></a>
      <a
        class="links"
        href="https://imerit.net/blog/the-60-best-free-datasets-for-machine-learning-all-pbm/"
      ></a>
      <a class="links" href="https://www.datasetlist.com/"></a>
      <Typography variant="h6">Spotify API Examples</Typography>
      <a class="links" href="http://sortyourmusic.playlistmachinery.com/"></a>
      <a class="links" href="http://organizeyourmusic.playlistmachinery.com/"></a>
      <a class="links" href="https://obscurifymusic.com/#!/"></a>
      <a class="links" href="https://www.spotibot.com/"></a>
      <a
        class="links"
        href="https://community.spotify.com/t5/Music-Chat/How-do-I-check-the-genre-of-a-song/td-p/1521053"
      ></a>
      <a class="links" href="https://beta.developer.spotify.com/console/get-track/"></a>
      <a class="links" href="http://playlistmachinery.com/index.html"></a>
      <a class="links" href="https://musicmachinery.com/"></a>
      <a class="links" href="http://static.echonest.com/enspex/"></a>
      <a class="links" href="https://www.last.fm/user/alexia_va"></a>
      <a class="links" href="https://spotifystatistics.com/"></a>
      <a class="links" href="https://zweicoder.gitlab.io/songbird/"></a>
      <a class="links" href="https://www.skiley.net/"></a>
      <a class="links" href="https://mainstream.ghan.nl/"></a>
      <a class="links" href="http://www.mymusichabits.com/"></a>
      <a class="links" href="http://explr.fm/"></a>
      <a class="links" href="https://descent.live/now"></a>
      <a class="links" href="https://insights.spotify.com/us/"></a>
