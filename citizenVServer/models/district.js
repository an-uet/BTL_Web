const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var districtSchema = new Schema({
    districtID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    districtName: {
        type: String,
        required:true
    },
    cityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
});

var Districts = mongoose.model('District', districtSchema);
module.exports = Districts;
