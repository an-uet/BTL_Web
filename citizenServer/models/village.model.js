const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var villageSchema = new Schema({
    villageID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    villageName: {
        type: String,
        required:true
    },
    wardID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    }
});

var Villages = mongoose.model('Village', villageSchema);
module.exports = Villages;
