'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the routing mechanism
 */
const fs = require("fs");                           // file system access
const httpStatus = require("http-status-codes");
const lib = require("../private/libWebUtil");           // home grown utilities

const experimental1 = require("../private/myCities"); // highly experimental template

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
                    console.log("nml: " + err);           // inform server
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

    findCities(req, res) {
        const mongo = require('mongodb');
        const dbname = "world";
        const constr = `mongodb://localhost:27017`;

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

                con.close();
            });
        });
    },

    insertCountry(req, res, data) {
      const mongo = require('mongodb');
      const dbname = "world";
      const constr = `mongodb://localhost:27017`;
      const cities = require('../private/MyCities.js');
console.log("kilroy: " + req.url + " " + req.method);
      let information = lib.makeWebArrays(req, data);
      let info = { name: information.POST.country, continent: information.POST.continent, area: information.POST.area, population: information.POST.population, govn: information.POST.govn };
      let obj = JSON.parse(info);
      let que = {name: obj.name, continent: obj.continent};

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
            db.collection("country").updateOne(
               que, {"$set": obj}, {upsert: true}, function (err, collection) {
                 if (err) {
                   throw err;
                }

                 res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                    "Content-Type": "text/html; charset=utf-8"
                });
                console.log("City inserted/updated");
                res.write(cities.cities(obj));
                res.end();
                con.close();
            });
        });
    }


};
