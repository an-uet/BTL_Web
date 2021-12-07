const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.city = require("./city.model")
db.workingTime = require("./time.model")
db.district = require("./district.model")
db.ward = require("./ward.model")
db.village = require("./village.model")

db.ROLES = ["A1", "A2", "A3", "B1", 'B2'];

module.exports = db;