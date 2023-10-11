import React from "react"
import linkedinphoto from "./assets/linkedinphoto.png"

const Connect = () => {
  return (
    <div>
      <table class="bio">
        <tr>
          <td class="contactImage">
            <img src={linkedinphoto} title="Headshot" id="headshot" width={50}></img>
          </td>
          <td class="contactDetails">
            <ul>
              <li>
                <p>New York, NY 10038</p>
              </li>
              <li>
                <p>660-247-5095</p>
              </li>
              <li>
                <a href="mailto:william.kieffer@outlook.com">william.kieffer@outlook.com</a>
              </li>
              <li>
                <p>
                  LinkedIn:{" "}
                  <a href="https://www.linkedin.com/in/williamkieffer24/">williamkieffer24</a>
                </p>
              </li>
              <li>
                <p>
                  GitHub:
                  <a href="https://github.com/willkieffer">willkieffer</a>
                </p>
              </li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Connect
