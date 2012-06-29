/**
 * Module dependencies.
 */

var express = require('express')
    , _ = require('underscore')
    , fs = require('fs')
    , routes = {};

_.chain(fs.readdirSync("./routes"))
    .filter(function (f) {
        return /\w+\.js$/.test(f)
    })
    .each(function (f) {
        routes = _.extend(routes, require("./routes/" + f));
    });

var mongoose = require('mongoose'),
    models = require(__dirname + '/models');

var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
    mongoose.connect("mongodb://<db_username>:<db_password>@ds0<db_port>.mongolab.com:<db_port>/<db_database>");
});

app.configure('production', function () {
    app.use(express.errorHandler());
    mongoose.connect("mongodb://<db_username>:<db_password>@ds0<db_port>.mongolab.com:<db_port>/<db_database>");
});

// Routes

// curl http://localhost:8080/api/spots?lon=52&lat=50&radius=10
app.get('/api/spock', routes.spots.get);

/*var dee = require('./libs/deezer/Deezer.js');
 console.dir(dee);*/


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
