var articles = require('../../controller/article.js');
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
var path = require("path");
var aws = require('aws-sdk');
// var S3_BUCKET = process.env.S3_BUCKET;
// aws.config.region = 'eu-east-2';
// aws.config.bucket = S3_BUCKET;
var multerS3 = require('multer-s3');
var s3 = new aws.S3({
    region: 'us-east-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: 'spaceboy'
});

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
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'spaceboy',
        ACL: 'public-read',
        key: function (req, file, cb) {
            // const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
            // cb(null, file.originalname);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});


module.exports = function (app) {
    app.post('/api/post/create', upload.single('articleImage'), function (req, res) {
        // console.log("1");
        // console.log(req.body.article_filename)
        // const s3 = new aws.S3();
        // const fileName = req.body.article_filename;
        // const fileType = "image/jpg";
        // const s3Params = {
        //   Bucket: S3_BUCKET,
        //   Key: fileName,
        //   Expires: 60,
        //   ContentType: fileType,
        //   ContentEncoding: 'base64',
        //   ContentBody: req.file,
        //   ACL: 'public-read'
        // };
        // console.log("2");
        // s3.upload(s3Params, (err,data)=>{
        //     if(err){
        //         console.log("S3 upload failed");
        //     } else {
        //         console.log("3");
        //         articles.createArticle(req, res);
        //     }
        // })
        console.log("Image uploaded successfully to: " + req.file.path);
        articles.createArticle(req, res);
    });

    // app.get('/api/post/sign-s3', (req, res) => {
    //     console.log("1");
    //     const s3 = new aws.S3();
    //     const fileName = req.query['file-name'];
    //     const fileType = req.query['file-type'];
    //     const s3Params = {
    //       Bucket: S3_BUCKET,
    //       Key: fileName,
    //       Expires: 60,
    //       ContentType: fileType,
    //       ACL: 'public-read'
    //     };
    //     console.log("2");
    //     s3.getSignedUrl('putObject', s3Params, (err, data) => {
    //       if(err){
    //         console.log(err);
    //         console.log("3");
    //         return res.end();
    //       }
    //       const returnData = {
    //         signedRequest: data,
    //         url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    //       };
    //       console.log("4");
    //       res.write(JSON.stringify(returnData));
    //       res.end();
    //     });
    // });

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