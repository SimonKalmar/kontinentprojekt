/* myCities.js Home made experimental templating */
"use strict";

const page = function(obj) {
    let htmltop = `<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>Language</title>
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

  <img src="wordcloud.png" class="fixedpic" />

  <div class="flex-box">
    <div class="box">
      <h2>Language</h2>
      <form action="/lang" method="POST">
        <div>
          <p>Name of language</p><br />
          <input type="text" placeholder="Type..." name="language" required>
        </div>
        <div>
          <p>Country</p><br />
          <input type="text" placeholder="Type..." name="country" required>
        </div>
        <div>
          <p>Percentage of people speaking it</p><br />
          <input type="text" placeholder="Type..." name="procentage" required>
        </div>
        <div>
          <p>Offical language</p><br />
          <input type="text" placeholder="Type..." name="official" required>
        </div>
        <input type="submit" value="Send">
      </form>
    </div>
  </div>

  <div class="marginup">
    <h2>List of Languages</h2>`;

    let htmlbot = `        </div>
    </body>
</html>`;

    let dynamic = "";
    for (let i = 0; i < obj.length; i++) {
      dynamic += `<div class="infobox">
      <div class="information">
        <span>Language //</span> ${obj[i].name}
      </div>
      <div class="information">
        <span>Country //</span> ${obj[i].country}
      </div>
      <div class="information">
        <span>Use in percentage //</span> ${obj[i].procentage}
      </div>
      <div class="information">
        <span>Official language //</span> ${obj[i].official}
      </div>
    </div>`;
    };

    return htmltop + dynamic + htmlbot;
}

exports.page = page;
