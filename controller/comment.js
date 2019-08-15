var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

module.exports = {

    createComment: function (req, res) {
        User.find({username: req.body.username}, function(err, user){
            if (err){
                // console.log("can't make comment because not logged in");
                res.json({error: "user not found"});
            } else {
                var comment = new Comment({
                    creator: user,
                    content: req.body.content,
                    mark_as_deleted: false 
                });
                comment.save(function (err, comment) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    } else {
                        console.log(comment.content);
                        res.json(comment);
                    }
                });
            }
        });
    },

    deleteComment: function (req, res) {
        Comment.find({_id: req.body._id}, function(err, comment){
            if (err){
                console.log(err);
                res.json(err);
            } else {
                comment.mark_as_deleted = true;
                comment.save(function (err, comment) {
                    if (err) {
                        // console.log(err);
                        res.json(err);
                    } else {
                        // console.log("comment deleted");
                        res.json(comment);
                    }
                });
            }
        });
    },

    updateComment: function (req, res) { 
        Comment.find({_id: req.body._id}, function(err, comment){
            if (err){
                console.log(err);
                res.json(err);
            } else {
                comment.content = req.body.content;
                comment.save(function (err, comment) {
                    if (err) {
                        // console.log(err);
                        res.json(err);
                    } else {
                        // console.log("comment updated successfully");
                        res.json(comment);
                    }
                });
            }
        });
    },

    getCommentsByArticleId: function (req, res) {
        Article.findOne({_id: req.body.article_id}, function(err, article){
            if(err){
                console.log(err);
            }
            else{
                console.log(article.comments);
                res.json(article.comments);
            }
        });
    }

}