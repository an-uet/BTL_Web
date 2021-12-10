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

//tìm tài khoản, xác nhận nó có phải là tài khoản có quyền xóa không. 
//user_role: role: A2,A3,B1,B2
//name: username
/*
function deleteUser(user_role, name) {
  User.findOne({ username: name }).exec((err, user) => {
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
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === user_role) {
            next();
            return;
          }
        }
        return;
      }
    );
  });

}
*/
exports.deleteA2 = (req, res) => {
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

            //nếu tài khoản tìm được là A2 --> xóa.
            User.findOneAndDelete({ username: req.body.username })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
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
  //xác định tài khoản cần xóa là của B1
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
  //xác định tài khoản cần xóa là của B2
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