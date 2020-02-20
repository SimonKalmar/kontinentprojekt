/* myCities.js Home made experimental templating */
"use strict";

const page = function(obj) {
    let htmltop = `<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Country</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <nav>
    <a href="/"><img src="earth.png" class="homepic"/></a>
    <div class="fillerbox"></div>

    <a href="/country">Country</a>
    <a href="/lang">Language</a>
    <a href="/city">City</a>
  </nav>

  <img src="continents.png" class="fixedpic" />

  <div class="flex-box">
    <div class="box">
      <h2>Country</h2>
      <form action="/country" method="POST">
        <div>
          <p>Name of country</p><br />
          <input type="text" placeholder="Type..." name="country" required>
        </div>
        <div>
          <p>Continent</p><br />
          <input type="text" placeholder="Type..." name="continent" required>
        </div>
        <div>
          <p>Area</p><br />
          <input type="text" placeholder="Type..." name="area" required>
        </div>
        <div>
          <p>Population</p><br />
          <input type="text" placeholder="Type..." name="population" required>
        </div>
        <div>
          <p>Government</p><br />
          <input type="text" placeholder="Type..." name="govn" required>
        </div>
        <input type="submit" value="Send">
      </form>
    </div>
  </div>

  <div class="marginup">
    <h2>List of Countries</h2>`;

    let htmlbot = `        </div>
    </body>
</html>`;

    let dynamic = "";
    for (let i = 0; i < obj.length; i++) {
      dynamic += `<div class="infobox">
      <div class="information">
        <span>Country //</span> ${obj[i].name}
      </div>
      <div class="information">
        <span>Continent //</span> ${obj[i].continent}
      </div>
      <div class="information">
        <span>Area //</span> ${obj[i].area}
      </div>
      <div class="information">
        <span>Population //</span> ${obj[i].population}
      </div>
      <div class="information">
        <span>Government //</span> ${obj[i].govn}
      </div>
    </div>`;
    };

    return htmltop + dynamic + htmlbot;
}

exports.page = page;
