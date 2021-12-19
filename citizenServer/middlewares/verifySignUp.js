const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const City = db.city;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
}

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
      if (!ROLES.includes(req.body.role)) {
        res.status(400).send({
          message: `Failed! Role ${req.body.role} does not exist!`,
        });
        return;
      }
  }
  next();
};

checkValidpassword = (req, res, next) => {
  if(req.body.password) {
    result = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    regex = new RegExp(result)
    if (req.body.password.match(regex)) {
      next();
    }
    else {
      res.status(400).send({message: "Mật khẩu bắt buộc có: tối thiểu 8 ký tự, có ít nhất một chữ cái in hoa, một chữ cái in thường, một ký tự đặc biệt"});
      return;
    }
  }
}

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted,
  checkValidpassword
 
};

module.exports = verifySignUp;