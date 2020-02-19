/*
 * File Name is  : findCity12.js
 * demoes reading one item a mongo collection
 */
'use strict';

const mongo = require('mongodb');
const dbname = "world";
const constr = `mongodb://localhost:27017`;
let countryCheck = function(objs) {

    db.collection("country").find(objs).toArray(function (err, country) {
        if (err) {
            throw err;
        }
        console.log(country);
        return country;

    });
};

exports.check = countryCheck;
