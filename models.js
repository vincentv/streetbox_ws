var mongoose = require('mongoose')

SpotSchema = new mongoose.Schema({

  levee: String,

  loc: {
    lon: Number,
    lat: Number
  },

  address : {
    street: String,
    zipcode: String,
    city: String
  }
});

SpotSchema.index({"loc": '2d' });
//SpotSchema.index({"loc" : 1}, { unique: true });

mongoose.model('Spot', SpotSchema);
