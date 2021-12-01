const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var citySchema = new Schema({
    cityID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cityName: {
        type: String,
        required:true
    }
})

var Citis = mongoose.model('City', citySchema);
module.exports = Citis;