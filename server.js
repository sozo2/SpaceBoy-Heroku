var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

require('./config/mongoose.js');
var PORT = process.env.PORT || 8000;

var app = express();
app.use(bodyParser.json());

app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'build')));

var whitelisted = ['http://localhost:3000',
                  'http://localhost:8000',
                  'http://samzoeller.com',
                  'https://spaceboy.herokuapp.com',
                  'https://spaceboy.s3.us-east-2.amazonaws.com'];
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

var user_routes = require('./config/routes/user.js');
var article_routes = require('./config/routes/article.js');
var comment_routes = require('./config/routes/comment.js');

user_routes(app);
article_routes(app);
comment_routes(app);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

var server = app.listen(PORT, function () {
    console.log("🤘 listening on port " + PORT);
});
