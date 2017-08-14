/**
 * Created by vinhdv on 8/26/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});


module.exports = mongoose.model('Room', UserSchema);