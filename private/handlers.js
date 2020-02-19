'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the routing mechanism
 */
const fs = require("fs");                           // file system access
const httpStatus = require("http-status-codes");
const lib = require("../private/libWebUtil");           // home grown utilities

const experimental1 = require("../private/showCountries"); // highly experimental template

const goError = function(res) {
    res.writeHead(httpStatus.NOT_FOUND, {   // http page not found, 404
        "Content-Type": "text/html; charset=utf-8"
    });
    res.write("<h1>404 Not Found</h1>");
    res.end();
};

module.exports = {
    getAndRespond(path, contentType, res) {
        if (fs.existsSync(path)) {              // does file exist, sync
            fs.readFile(path, function(err, data) { // read
                if (err) {                      // if read error
                    goError(res);               // inform user
                    return;                     // back to caller
                }
                res.writeHead(httpStatus.OK, contentType); // prep header
                res.write(data);                // prep body with read data
                res.end();                      // send response
            });
        } else {
            goError(res);                       // doesnt exist error
        }
    },

    receiveData(req, res, data) {
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        res.writeHead(httpStatus.OK, {                  // yes, write relevant header
            "Content-Type": "text/html; charset=utf-8"
        });
        res.write(experimental.receipt(obj));           // home made templating for native node
    },

    findCountry(req, res) {
        const mongo = require('mongodb');
        const dbname = "world";
        const constr = `mongodb://localhost:27017`;
        const build = require('../private/showCountries.js');


        mongo.connect(
            constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                        function (error, con) {
            if (error) {
                throw error;
            }
            const db = con.db(dbname);                  // make dbname the current db
            /* Retrieve,
             * reads cities from the database
             */
            db.collection("country").find().toArray(function (err, country) {
                if (err) {
                    throw err;
                }
                res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                    "Content-Type": "text/html; charset=utf-8"
                });
                res.write(build.page(country));
                res.end();
                con.close();
            });
        });
    },

    findLang(req, res) {
        const mongo = require('mongodb');
        const dbname = "world";
        const constr = `mongodb://localhost:27017`;
        const build = require('../private/showLang.js');

        mongo.connect(
            constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                        function (error, con) {
            if (error) {
                throw error;
            }
            const db = con.db(dbname);                  // make dbname the current db
            /* Retrieve,
             * reads cities from the database
             */
            db.collection("language").find().toArray(function (err, lang) {
                if (err) {
                    throw err;
                }
                res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                    "Content-Type": "text/html; charset=utf-8"
                });
                res.write(build.page(lang));
                res.end();
                con.close();
            });
        });
    },

    findCity(req, res) {
        const mongo = require('mongodb');
        const dbname = "world";
        const constr = `mongodb://localhost:27017`;
        const build = require('../private/showCities.js');

        mongo.connect(
            constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                        function (error, con) {
            if (error) {
                throw error;
            }
            const db = con.db(dbname);                  // make dbname the current db
            /* Retrieve,
             * reads cities from the database
             */
            db.collection("city").find().toArray(function (err, city) {
                if (err) {
                    throw err;
                }
                res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                    "Content-Type": "text/html; charset=utf-8"
                });
                res.write(build.page(city));
                res.end();
                con.close();
            });
        });
    },

    insertCountry(req, res, data) {
      const mongo = require('mongodb');
      const dbname = "world";
      const constr = `mongodb://localhost:27017`;
      const build = require('../private/countries.js');
      const continent = require('../private/continents.js');
      let information = lib.makeWebArrays(req, data);
      let info = { name: information.POST.country, continent: information.POST.continent, area: information.POST.area, population: information.POST.population, govn: information.POST.govn };
//      let obj = JSON.parse(info);
      let que = {name: info.name, continent: info.continent};

        mongo.connect(
            constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                        function (error, con) {
            if (error) {
                throw error;
            }
            const db = con.db(dbname);                  // make dbname the current db
            /* Retrieve,
             * reads cities from the database
             */
            if (info.continent === continent.Africa || info.continent === continent.Europe || info.continent === continent.Asia || info.continent === continent.Antarctica || info.continent === continent.NorthAmerica || info.continent === continent.SouthAmerica || info.continent === continent.Oceania ) {
              db.collection("country").updateOne(
                que, {"$set": info}, {upsert: true}, function (err, collection) {
                  if (err) {
                    throw err;
                  }

                  res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                      "Content-Type": "text/html; charset=utf-8"
                  });
                  console.log("Country inserted/updated");
                  res.write(build.countries(info));
                  res.end();
                  con.close();
            });
          } else {
            res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                "Content-Type": "text/html; charset=utf-8"
            });
            console.log("Hello");
            res.end();
            con.close();
          };
        });
    },



    insertLang(req, res, data) {
      const mongo = require('mongodb');
      const dbname = "world";
      const constr = `mongodb://localhost:27017`;
      const build = require('../private/countries.js');
      const continent = require('../private/continents.js');
      let information = lib.makeWebArrays(req, data);
      let info = { name: information.POST.language, country: information.POST.country, procentage: information.POST.procentage, official: information.POST.official };
//      let obj = JSON.parse(info);
      let find = { name: info.country };
      let que = {name: info.name, country: info.country};
      let countryCheck = require('../private/countryCheck.js');


      mongo.connect(
          constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                      function (error, con) {
          if (error) {
              throw error;
          }
          const db = con.db(dbname);                  // make dbname the current db
          /* Retrieve,
           * reads cities from the database
           */
          db.collection("country").find({name: information.POST.country}).toArray(function (err, country) {
              if (err) {
                  throw err;
              }
              console.log(country);
              console.log(country[0].name);
              if (information.POST.country === country[0].name) {
                db.collection("language").updateOne(
                  que, {"$set": info}, {upsert: true}, function (err, collection) {
                    if (err) {
                      throw err;
                    }

                    res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                        "Content-Type": "text/html; charset=utf-8"
                    });
                    console.log("City inserted/updated");
                    res.write(build.countries(info));
                    res.end();
                    con.close();
              });
            } else {
              res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                  "Content-Type": "text/html; charset=utf-8"
              });
              console.log("Hello");
              res.end();
              con.close();
            };
          });
      });
    },

    insertCity(req, res, data) {
      const mongo = require('mongodb');
      const dbname = "world";
      const constr = `mongodb://localhost:27017`;
      const build = require('../private/countries.js');
      const continent = require('../private/continents.js');
      let information = lib.makeWebArrays(req, data);
      let info = { name: information.POST.city, country: information.POST.country, population: information.POST.population, capital: information.POST.capital };
//      let obj = JSON.parse(info);
      let find = { name: info.country };
      let que = {name: info.name, country: info.country};
      let countryCheck = require('../private/countryCheck.js');


      mongo.connect(
          constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                      function (error, con) {
          if (error) {
              throw error;
          }
          const db = con.db(dbname);                  // make dbname the current db
          /* Retrieve,
           * reads cities from the database
           */
          db.collection("country").find({name: information.POST.country}).toArray(function (err, country) {
              if (err) {
                  throw err;
              }
              console.log(country);
              console.log(country[0].name);
              if (information.POST.country === country[0].name) {
                db.collection("city").updateOne(
                  que, {"$set": info}, {upsert: true}, function (err, collection) {
                    if (err) {
                      throw err;
                    }

                    res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                        "Content-Type": "text/html; charset=utf-8"
                    });
                    console.log("City inserted/updated");
                    res.write(build.countries(info));
                    res.end();
                    con.close();
              });
            } else {
              res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                  "Content-Type": "text/html; charset=utf-8"
              });
              console.log("Hello");
              res.end();
              con.close();
            };
          });
      });
    },


};
