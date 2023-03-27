$(document).ready(function () {
    $("#header").html(`
    <h1 id="header-name">William Kieffer</h1>
    <div id="navbarL">
        <div class="navL grow"><a href="index.html">Home</a></div>
        <div class="navL grow"><a href="resume.html">Resume</a></div>
        <div class="navL grow"><a href="personal.html">Personal</a></div>
        <div class="navL grow"><a href="links.html">Links</a></div>
        <div class="navL grow"><a href="connect.html">Connect</a></div>
    </div>
    <div id="smallNav">
        <div id="showNav">
            <p>Show Navigation</p>
        </div>
        <div id="navbarS">
            <div class="navS"><a href="index.html">Home</a></div>
            <div class="navS"><a href="resume.html">Resume</a></div>
            <div class="navS"><a href="personal.html">Personal</a></div>
            <div class="navS"><a href="links.html">Links</a></div>
            <div class="navS"><a href="connect.html">Connect</a></div>
        </div>
    </div>
    `);
    $("#footer").html(`
    <p>Last Updated: March 2023</p>
    `);

    let originalHeightP1 = 0;
    let originalHeightP2 = 0;
    let originalHeightP3 = 0;
    let originalHeightP4 = 0;

    $("#showNav").bind("click", function() {
        if($("#navbarS").css("height") == "0px") {
            $("#navbarS").css("height", "auto");
            //Fix this
            $("#showNav").innerHTML = "<p>Hide Navigation</p>";
            console.log($("#showNav").innerHTML);
        } else {
            $("#navbarS").css("height", "0px");
            $("#showNav").innerHTML = "<p>Show Navigation</p>";
        }
    });

    $("#toggleProject1").bind("mouseover", function () {
        if (originalHeightP1 == 0) {
            originalHeightP1 = $("#project1").height();
            $("#project1").css("height", originalHeightP1 + "px");
        }
    });

    $("#toggleProject1").bind("click", function () {
        if (this.innerHTML == "Collapse README.md") {
            $("#project1").css("height", "50px");
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
            $("#project2").css("height", "50px");
            this.innerHTML = "Expand README.md";
        } else {
            $("#project2").css("height", originalHeightP2 + "px");
            this.innerHTML = "Collapse README.md";
        }
    });

    $("#toggleProject3").bind("mouseover", function () {
        if (originalHeightP3 == 0) {
            originalHeightP3 = $("#project3").height();
            $("#project3").css("height", originalHeightP3 + "px");
        }
    });

    $("#toggleProject3").bind("click", function () {
        if (this.innerHTML == "Collapse README.md") {
            $("#project3").css("height", "50px");
            this.innerHTML = "Expand README.md";
        } else {
            $("#project3").css("height", originalHeightP3 + "px");
            this.innerHTML = "Collapse README.md";
        }
    });

    $("#toggleProject4").bind("mouseover", function () {
        if (originalHeightP4 == 0) {
            originalHeightP4 = $("#project4").height();
            $("#project4").css("height", originalHeightP4 + "px");
        }
    });

    $("#toggleProject4").bind("click", function () {
        if (this.innerHTML == "Collapse README.md") {
            $("#project4").css("height", "50px");
            this.innerHTML = "Expand README.md";
        } else {
            $("#project4").css("height", originalHeightP4 + "px");
            this.innerHTML = "Collapse README.md";
        }
    });
});