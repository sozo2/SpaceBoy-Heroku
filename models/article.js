var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ArticleSchema = new mongoose.Schema({
    _creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    content: {
        type: String
    },
    tags: [{
        type: String
    }],
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    image: { 
        data: Buffer, 
        contentType: String 
    },
    mark_as_deleted: {
        type: Boolean
    }},
    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var Article = mongoose.model('Article', ArticleSchema);