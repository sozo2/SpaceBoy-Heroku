var articles = require('../../controller/article.js');
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
var path = require("path");
var aws = require('aws-sdk');
var S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'eu-east-2';
var xhr = require("xmlhttprequest")

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

    function uploadFile(file, signedRequest, url){
        // const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              console.log("Image upload successful: " + url);
            }
            else{
              console.log('Could not upload file.');
            }
          }
        };
        xhr.send(file);
    }

    function getSignedRequest(file, newfilename){
        // const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/post/sign-s3?file-name=${newfilename}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              const response = JSON.parse(xhr.responseText);
              uploadFile(file, response.signedRequest, response.url);
            }
            else{
              console.log('Could not get signed URL.');
            }
          }
        };
        xhr.send();
      }


module.exports = function (app) {
    app.post('/api/post/create', function (req, res) {
        getSignedRequest(req.file, req.body.article_filename);
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