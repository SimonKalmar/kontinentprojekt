/* myCities.js Home made experimental templating */
"use strict";

const page = function(obj) {
    let htmltop = `<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>McKilroy's Second Test Template</title>
        <link rel="stylesheet" href="side.css"/>
    </head>
    <body>
        <header>
            <h1>Languages</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/side">Side</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
        <div>`;

    let htmlbot = `        </div>
    </body>
</html>`;

    let dynamic = "";
    for (let i = 0; i < obj.length; i++) {
      dynamic += `<p><em>City: ${obj[i].name}, Country: ${obj[i].country}, Procentage: ${obj[i].procentage} and Official: ${obj[i].official}</em></p>`;
    };

    return htmltop + dynamic + htmlbot;
}

exports.page = page;
