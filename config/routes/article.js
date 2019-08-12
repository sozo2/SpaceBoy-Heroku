var articles = require('../../controller/article.js');
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
var path = require("path");
var aws = require('aws-sdk');
// var S3_BUCKET = process.env.S3_BUCKET;
// aws.config.region = 'eu-east-2';
// aws.config.bucket = S3_BUCKET;
// var multerS3 = require('multer-s3');
var s3 = new aws.S3({
    region: 'us-east-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: 'spaceboy'
});

module.exports = function (app) {

    app.post('/api/post/create', function (req, res) {
        console.log("CREATE REQUEST");
        console.log(req);
        console.log(req.body.article_src);
        const file = req.body.articleImage;
        const params = {
            Bucket: 'spaceboy',
            Key: "thisisatest.jpg",
            ACL: 'public-read',
            Body: file
        };
        console.log(params);
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log(data);
            }
        });

        console.log("Image uploaded successfully to: " + req.file.path);
        articles.createArticle(req, res);
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