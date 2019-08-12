var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var fs = require('fs');
var path = require('path');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/SpaceBoy', {useNewUrlParser: true});
var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});