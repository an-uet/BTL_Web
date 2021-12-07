const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var villageSchema = new Schema({
    villageID: {
        type: String,
        required: true
    },
    villageName: {
        type: String,
        required:true
    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    }
});

var Village = mongoose.model('Village', villageSchema);
module.exports = Village;
