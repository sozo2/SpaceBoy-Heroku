var comments = require('../../controller/comment.js');

module.exports = function (app) {
    app.post('/api/comment/create', function (req, res) {
        comments.createComment(req, res);
    });

    app.post('/api/comment/delete', function (req, res) {
        comments.deleteComment(req, res);
    });

    app.post('/api/comment/update', function (req, res) {
        comments.updateComment(req, res);
    });

    app.post('/api/comment/article-comments', function (req, res) {
        comments.getCommentsByArticleId(req, res);
    });
}