const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var wardSchema = new Schema({
    wardID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    wardName: {
        type: String,
        required:true
    },
    DistrictID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    }
});

var Wards = mongoose.model('Ward', wardSchema);
module.exports = Wards;
