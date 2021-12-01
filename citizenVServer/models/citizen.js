const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var citizenSchema = new Schema({
    citizenID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    firstname: {
        type: String,
        required: true

    },
    lastname: {
        type: String,
        required: true

    },
    dateOfBirth: {
        type: Date,
        required: true

    },
    gender: {
        type: String,
        required: true

    },
    timeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Time'

    },
    villageID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Village'

    },
    wardID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ward'

    },
    districtID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'District'

    },
    cityID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'City'

    }
})