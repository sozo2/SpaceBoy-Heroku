var articles = require('../../controller/article.js');
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
var path = require("path");
var aws = require('aws-sdk');
var S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'eu-east-2';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads');
//     },
//     filename: (req, file, cb) => {
//         const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
//         cb(null, newFilename);
//     },
// });
// const upload = multer({ storage });


module.exports = function (app) {
    app.post('/api/post/create', function (req, res) {
        // console.log("Image uploaded successfully to: " + req.file.path);
        articles.createArticle(req, res);
    });

    app.get('/api/post/sign-s3', (req, res) => {
        const s3 = new aws.S3();
        const fileName = req.body.fileName;
        const fileType = req.body.fileType;
        const s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
          Expires: 60,
          ContentType: fileType,
          ACL: 'public-read'
        };
      
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
          if(err){
            console.log(err);
            return res.end();
          }
          const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
          };
          res.write(JSON.stringify(returnData));
          res.end();
        });
    });

    app.post('/api/post/get', function (req, res) {
        articles.getArticleByID(req, res);
    });

    app.post('/api/post/get-with-comments', function (req, res) {
        articles.getArticleWithComments(req, res);
    });

    app.post('/api/post/update', function (req, res) {
        articles.updateArticle(req, res);
    });

    app.post('/api/post/delete', function (req, res) {
        console.log(req.body);
        articles.deleteArticle(req, res);
    });

    app.post('/api/post/get-all', function (req, res) {
        if(req.body.category=="all") {
            articles.getAllArticles(req, res);
        } else {
            articles.getAllArticlesByCategory(req,res);
        }
    });

    app.post('/api/post/tags', function (req, res) {
        articles.getTagHistogram(req, res);
    });
}