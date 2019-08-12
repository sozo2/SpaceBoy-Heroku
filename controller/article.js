var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var User = mongoose.model('User');




module.exports = {

    createArticle: function (req, res) {
        console.log(req.body.article_creator);
        console.log("USER ^^ BODY vv");
        console.log(req.body);
        User.findOne({username: req.body.article_creator}, function(err, user){
            if (err){
                console.log("can't post article error finding user");
                res.json(err);
            } else {
                console.log("123");
                var article = new Article({
                    _creator: user._id,
                    title: req.body.article_title,
                    description: req.body.article_description,
                    category: req.body.article_category,
                    tags: [],
                    content: req.body.article_content,
                    comments: [],
                    // image: {
                    //     data: req.file.path,
                    //     contentType: req.file.mimetype
                    // },
                    image_src: "https://spaceboy.s3.us-east-2.amazonaws.com/" + req.file.path,
                    mark_as_deleted: false 
                });
                console.log("456");
                console.log(article.image_src);
                user._articles.push(article);
                user.save(function(err,user){
                    article.save(function (err, article) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        } else {
                            console.log("posted article succesfully");
                            res.json(article);
                        }
                    });
                })
            }
        });

    },

    getArticleByID: function (req, res) {
        Article.findOne({_id: req.body.article_id}).populate("_creator").exec(function(err, article){
            if(err){
                console.log(err);
            }
            else{
                console.log(article);
                res.json(article);
            }
        });
    },

    updateArticle: function (req, res) {
        Article.findOne({_id: req.body.article_id}, function(err, article){
            if(err){
                console.log(err);
            }
            else{
                article.content = req.body.content; 
                article.title = req.body.title;
                article.description = req.body.description;
                article.category = req.body.description;
                article.tags = req.body.tags;
                // article.image = {
                //     data: req.file.path,
                //     contentType: req.file.mimetype
                // }
                article.image_src = "https://spaceboy.s3.us-east-2.amazonaws.com" + req.file.path;
                article.save(function(err, article){
                    if(err){
                        console.log(err);
                        res.json(err);
                    } else {
                        console.log(article);
                        res.json(article);
                    }
                });
            }
        });
    },

    deleteArticle: function(req, res) {
        Article.findOne({_id: req.body.article_id}, function(err, article){
            if(err){
                console.log(err);
            }
            else{
                article.mark_as_deleted = true;
                article.save(function(err, article){
                    if(err){
                        console.log("error while deleting");
                        console.log(err);
                        res.json(err);
                    } else {
                        console.log("success while deleting");
                        console.log(article);
                        res.json(article);
                    }
                });
            }
        });
    },

    getAllArticles: function (req, res) {
        Article.find({mark_as_deleted: false}, function(err, articles){
            if (err){
                console.log(err);
                res.json([]);
            } else {
                console.log("fetched all articles");
                res.json(articles);
            }
        })
    },

    getAllArticlesByCategory: function (req, res) {
        Article.find({mark_as_deleted: false, category: req.body.category}, function(err, articles){
            if (err){
                console.log(err);
                res.json([]);
            } else {
                console.log("fetched all articles");
                res.json(articles);
            }
        })
    },

    getTagHistogram: function (req, res) {
        var histogram = {
            
        }
        //get "histogram" style data of tags by category
    }

}    