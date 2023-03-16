$(document).ready(function () {
    $("#header").html(`
    <h1 id="header-name">William Kieffer</h1>
    <div id="navbar">
        <ul>
            <li class="nav grow"><a class="navlink" href="index.html">Home</a></li>
            <li class="nav grow"><a class="navlink" href="about.html">About</a></li>
            <li class="nav grow"><a class="navlink" href="personal.html">Personal</a></li>
            <li class="nav grow"><a class="navlink" href="links.html">Links</a></li>
            <li class="nav grow"><a class="navlink" href="connect.html">Connect</a></li>
        </ul>
    </div>
    `);
    $("#footer").html(`
    <p>Last Updated: March 2023</p>
    `);

    let originalHeightP1 = 0;
    let originalHeightP2 = 0;

    $("#toggleProject1").bind("mouseover", function () {
        if (originalHeightP1 == 0) {
            originalHeightP1 = $("#project1").height();
            $("#project1").css("height", originalHeightP1 + "px");
        }
    });

    $("#toggleProject1").bind("click", function () {
        if (this.innerHTML == "Collapse README.md") {
            $("#project1").css("height", "70px");
            this.innerHTML = "Expand README.md";
        } else {
            $("#project1").css("height", originalHeightP1 + "px");
            this.innerHTML = "Collapse README.md";
        }
    });

    $("#toggleProject2").bind("mouseover", function () {
        if (originalHeightP2 == 0) {
            originalHeightP2 = $("#project2").height();
            $("#project2").css("height", originalHeightP2 + "px");
        }
    });

    $("#toggleProject2").bind("click", function () {
        if (this.innerHTML == "Collapse README.md") {
            $("#project2").css("height", "70px");
            this.innerHTML = "Expand README.md";
        } else {
            $("#project2").css("height", originalHeightP2 + "px");
            this.innerHTML = "Collapse README.md";
        }
    });
});