var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

require('./config/mongoose.js');
var PORT = process.env.PORT || 8000;

var user_routes = require('./config/routes/user.js');
var article_routes = require('./config/routes/article.js');
var comment_routes = require('./config/routes/comment.js');

var app = express();
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'build')));

// fs.readdirSync(models_path).forEach(function(file) {
//   if(file.indexOf('.js') >= 0) {
//     require(models_path + '/' + file);
//   }
// });

var whitelisted = ['http://localhost:3000',
                  'http://localhost:8000',
                  'http://samzoeller.com',
                  'https://spaceboy.herokuapp.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(whitelisted.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

user_routes(app);
article_routes(app);
comment_routes(app);

// var pages_path = path.join(__dirname, '/src');
// fs.readdirSync(pages_path).forEach(function(file) {
//   if(file.indexOf('.js') >= 0) {
//     require(pages_path + '/' + file);
//   }
// });
// app.get('/uploads', (req, res) => {
//   console.log("HITTING UPLOADS________________");
//   res.sendFile(path.join(__dirname, '/uploads'));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

var server = app.listen(PORT, function () {
    console.log("🤘 listening on port " + PORT);
});
