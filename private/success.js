/* myCities.js Home made experimental templating */
"use strict";

const page = function(obj) {
    let htmltop = `<!DOCTYPE html>
    <html lang="en" dir="ltr">

    <head>
    <meta charset="utf-8">
    <title>Entry Success!</title>
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

    <img src="worldsuccess.png" class="fixedpic" style="width: 700px;" />

    <div class="flex-box" style="margin-top: 250px;">
    <div class="box" style="width: 700px;">
      <h2>Success! Entry has been entered!</h2>
      <p style="color: #fff;">Your attempt to enter ${obj.name} has been a success! Go back to the list to see your entry is now able to be read!
      </p>
    </div>
    </div>`;

    let htmlbot = `
    </body>
</html>`;


    return htmltop + htmlbot;
}

exports.page = page;
