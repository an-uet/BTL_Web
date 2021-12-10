const db = require("../models");
const User = db.user;
const Role = db.role;

//get list of user.
exports.getA2 = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.find({createBy: user.username})
    .populate("roles")
    .populate("city")
    .exec((err, users) =>{
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(users);

    })
  });
};

exports.getA3 = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.find({createBy: user.username})
    .populate("roles")
    .populate("district")
    .exec((err, users) =>{
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(users);

    })
  });
  
};

exports.getB1 = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.find({createBy: user.username})
    .populate("roles")
    .populate("ward")
    .exec((err, users) =>{
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(users);

    })
  });
};

exports.getB2 = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.find({createBy: user.username})
    .populate("roles")
    .populate("village")
    .exec((err, users) =>{
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(users);

    })
  });
};



// function để xóa hết các tài khoản liên quan.
function deleteAllUser(regax){
  User.deleteMany({ username: regax })
  .exec((err, users) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all user were created");

  })
}


exports.deleteA2 = (req, res) => {
  //pattern để xóa tất cả user tạo bởi 1 tài khoản A2.
  var re = "^";
  var result = re.concat(req.body.username)
  var regax = new RegExp(result,"g")

 //xác định tài khoản cần xóa là của A2
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "A2") {

            User.findOneAndDelete({ username: req.body.username })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                deleteAllUser(regax);
                res.send({ message: "User was deleted" });
              })
            return;
          }
        }
        res.status(403).send({ message: "you can not delete this user!" });
        return;
      }
    );

  });

}

exports.deleteA3 = (req, res) => {
  //pattern để xóa tất cả user tạo bởi 1 tài khoản A3.
  var re = "^";
  var result = re.concat(req.body.username)
  var regax = new RegExp(result,"g")

 //xác định tài khoản cần xóa là của A3
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "A3") {

            User.findOneAndDelete({ username: req.body.username })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                deleteAllUser(regax);
                res.send({ message: "User was deleted" });
              })
            return;
          }
        }
        res.status(403).send({ message: "you can not delete this user!" });
        return;
      }
    );

  });

}


exports.deleteB1 = (req, res) => {
  //pattern để xóa tất cả user tạo bởi 1 tài khoản A3.
  var re = "^";
  var result = re.concat(req.body.username)
  var regax = new RegExp(result,"g")

 //xác định tài khoản cần xóa là của A3
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "B1") {

            User.findOneAndDelete({ username: req.body.username })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                deleteAllUser(regax);
                res.send({ message: "User was deleted" });
              })
            return;
          }
        }
        res.status(403).send({ message: "you can not delete this user!" });
        return;
      }
    );

  });

}


exports.deleteB2 = (req, res) => {
  //pattern để xóa tất cả user tạo bởi 1 tài khoản A3.
  var re = "^";
  var result = re.concat(req.body.username)
  var regax = new RegExp(result,"g")

 //xác định tài khoản cần xóa là của A3
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "B2") {

            User.findOneAndDelete({ username: req.body.username })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                deleteAllUser(regax);
                res.send({ message: "User was deleted" });
              })
            return;
          }
        }
        res.status(403).send({ message: "you can not delete this user!" });
        return;
      }
    );

  });
}


//edit user
exports.editUser = (req, res) => {
  User.findOneAndUpdate({ username: req.body.username }, {
    $set: req.body
  }, { new: true })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was edited" });

    })
}

exports.putA2 = (req, res) => {

  //xác nhận tài khoản cần sửa là A2
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "A2") {

            User.findOneAndUpdate({ username: req.body.username }, { $set: req.body }, { new: true })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                //User.find({createBy: user.username})
                //res.send({ message: "A2 was edited" });

              })
            return;
          }
        }

        res.status(403).send({ message: "you can not edit this user!" });
        return;
      }
    );
  });

}