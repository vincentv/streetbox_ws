
var mongoose = require('mongoose'),
_ = require('underscore');

exports.spots = {}

/**
 * Retourne la liste des playlist
*/
exports.spots.get = function(req, res){
  var result = [], model, query, lat, lon, maxDistance, ordered;

  lat = parseFloat(req.param('lat'));
  lon = parseFloat(req.param('lon'));
  limit = parseFloat(req.param('limit', 20));
  maxDistance = parseFloat(req.param('maxDistance', 2 / 111.2));
  ordered = parseInt(req.param('ordered', 1));

  model = mongoose.model('Spot');
  if (1 === ordered) {
    query = model.find(
      {
      "loc": {
        "$near": [lon, lat],
        "$maxDistance": maxDistance
      }
    }
    );

  } else {
    query = model.find({
      "loc": {
        "$within": {
          "$center": [ [lon, lat], maxDistance]
        }
      }
    });
  }

  query.limit(limit)
  query.exec(function(err, elmts){
    res.send(elmts);
  });
}
