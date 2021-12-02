const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["A1", "A2", "A3", "B1", 'B2'];

module.exports = db;