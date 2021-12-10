const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var citizenSchema = new Schema({
    citizenID: {
        type: String,
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
    village: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Village'

    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward'

    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'

    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'

    },
    address: {
        type: String,
    }
})

var Citizen = mongoose.model('Citizen', citizenSchema);
module.exports = Citizen;