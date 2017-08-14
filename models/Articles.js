var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: false
    },
    status: {
        type: Number,
        min: 1
    },
    date_created: {type: Date, default: Date.now},
    date_updated: {type: Date, default: Date.now},
});


module.exports = mongoose.model('Articles', ArticleSchema);