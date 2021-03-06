var articles = require('../../controller/article.js');
var multer  = require('multer');
const uuid = require('uuid/v4');

var aws = require('aws-sdk');
var s3 = new aws.S3({
    region: 'us-east-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: 'spaceboy'
});

var upload = multer({destination: '/'});

module.exports = function (app) {

    app.post('/api/post/create', upload.single("articleImage"), function (req, res) {
        let newfilename = uuid() + req.file.originalname;
        const params = {
            Bucket: 'spaceboy',
            Key: newfilename,
            ACL: 'public-read',
            Body: req.file.buffer
        };
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log(data);
            }
        });

        console.log("Image uploaded successfully to: " + req.file.path);
        articles.createArticle(req, res, newfilename);
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