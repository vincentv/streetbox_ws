
var mongoose = require('mongoose'),
_ = require('underscore');

mongoose.set('debug', true)

exports.spots = {}

/**
 * Retourne la liste des playlist
*/
exports.spots.get = function(req, res){
  var result = [], query, lat, lon, radius;

  limit = parseFloat(req.param('limit'));
  maxDistance = parseFloat(req.param('maxDistance'));
  lat = parseFloat(req.param('lat'));
  lon = parseFloat(req.param('lon'));
  ordered = (_.isUndefined(req.param('ordered'))) ? 1 : parseInt(req.param('ordered'));

  if (1 === ordered) {
    query = mongoose.model('Spot')
    .find(
      {
      "loc": {
        "$near": [lon, lat],
        "$maxDistance": maxDistance
      }
    }
    );

  } else {
    query = mongoose.model('Spot')
    .find(
      {
      "loc": {
        "$within": {
          "$center": [
            [lon, lat]
            , maxDistance
          ]
        }
      }
    }
    );
  }

  query.limit(limit)
  query.exec(function(err, elmts){
    res.send(elmts);
  });
}
