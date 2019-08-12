var mongoose = require('mongoose');
var Schema = mongoose.Schema

var CategorySchema = new mongoose.Schema({
    category: {
        type: String
    },
    tags: [{
        tag: {
            type: String
        },
        count: {
            type: Number
        }
    }]},
    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

var Category = mongoose.model('Category', CategorySchema);