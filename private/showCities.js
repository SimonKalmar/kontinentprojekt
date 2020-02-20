/* myCities.js Home made experimental templating */
"use strict";

const page = function(obj) {
    let htmltop = `<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>City</title>
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

  <img src="cities.png" class="fixedpic" />

  <div class="flex-box">
    <div class="box">
      <h2>City</h2>
      <form action="/city" method="POST">
        <div>
          <p>Name of city</p><br />
          <input type="text" placeholder="Type..." name="city" required>
        </div>
        <div>
          <p>Country</p><br />
          <input type="text" placeholder="Type..." name="country" required>
        </div>
        <div>
          <p>Population</p><br />
          <input type="text" placeholder="Type..." name="population" required>
        </div>
        <div>
          <p>Capital</p><br />
          <input type="text" placeholder="Type..." name="capital" required>
        </div>
        <input type="submit" value="Send">
      </form>
    </div>
  </div>

  <div class="marginup">
    <h2>List of Cities</h2>`;

    let htmlbot = `        </div>
    </body>
</html>`;

    let dynamic = "";
    for (let i = 0; i < obj.length; i++) {
      dynamic += `<div class="infobox">
      <div class="information">
        <span>City //</span> ${obj[i].name}
      </div>
      <div class="information">
        <span>Country //</span> ${obj[i].country}
      </div>
      <div class="information">
        <span>Population //</span> ${obj[i].population}
      </div>
      <div class="information">
        <span>Capital //</span> ${obj[i].capital}
      </div>
    </div>`;
    };

    return htmltop + dynamic + htmlbot;
}

exports.page = page;
