
var mongoose = require('mongoose'),
_ = require('underscore');

mongoose.set('debug', true)

exports.spots = {}

/**
 * Retourne la liste des playlist
*/
exports.spots.get = function(req, res){
    var result = [], query, lat, lon, radius;

    radius = parseFloat(req.param('radius'));
    lat = parseFloat(req.param('lat'));
    lon = parseFloat(req.param('lon'));

    query = mongoose.model('Spot')
    .find(
        {
            "loc": {
                "$within": {
                    "$center": [
                        [lon, lat]
                        , radius
                    ]
                }
            }
        }
    );

    query.exec(function(err, elmts){
        res.send(elmts);
    });
}
