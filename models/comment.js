var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CommentSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    content: {
        type: String
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

var Comment = mongoose.model('Comment', CommentSchema);