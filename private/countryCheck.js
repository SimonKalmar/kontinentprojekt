/*
 * File Name is  : findCity12.js
 * demoes reading one item a mongo collection
 */
'use strict';

let countryCheck = function(objs) {

const mongo = require('mongodb');
const dbname = "world";
const constr = `mongodb://localhost:27017`;

mongo.connect(
    constr, { useNewUrlParser: true, useUnifiedTopology: true},
                                                function (error, con) {
    if (error) {
        throw error;
    }
    console.log(`Connected to server`);
    const db = con.db(dbname);                  // make dbname the current db
    /* Retrieve,
     * reads cities from the database
     */
    db.collection("country").find(objs).toArray(function (err, country) {
        if (err) {
            throw err;
        }
        console.log(country);
        return country;
        con.close();
    });
});


};

exports.check = countryCheck;
