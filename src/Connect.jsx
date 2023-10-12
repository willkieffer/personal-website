import React from "react"
import linkedinphoto from "./assets/linkedinphoto.png"
import { Link, Stack, Typography } from "@mui/material"

const Connect = () => {
  return (
    <>
      <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        <img src={linkedinphoto} title="Headshot" id="headshot" width={150} height={150} />
        <Stack spacing={1}>
          <Typography>New York, NY 10038</Typography>
          <Typography>660-247-5095</Typography>
          <Link underline="none" href="mailto:william.kieffer@outlook.com">
            william.kieffer@outlook.com
          </Link>
          <Typography>
            LinkedIn:{" "}
            <Link underline="none" href="https://www.linkedin.com/in/williamkieffer24/">
              williamkieffer24
            </Link>
          </Typography>
          <Typography>
            GitHub:{" "}
            <Link underline="none" href="https://github.com/willkieffer">
              willkieffer
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

export default Connect
