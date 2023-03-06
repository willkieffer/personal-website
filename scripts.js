$(document).ready(function () {
    $("#header").html(`
    <h1 id="header-name">William Kieffer</h1>
    <div id="navbar">
        <ul>
            <li class="nav"><a class="navlink" href="index.html">Home</a></li>
            <li class="nav"><a class="navlink" href="about.html">About</a></li>
            <li class="nav"><a class="navlink" href="personal.html">Personal</a></li>
            <li class="nav"><a class="navlink" href="links.html">Links</a></li>
            <li class="nav"><a class="navlink" href="connect.html">Connect</a></li>
        </ul>
    </div>
    `);
    $("#footer").html(`
    <p>Last Updated: March 2023</p>
    `);
});