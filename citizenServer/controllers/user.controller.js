const db = require("../models");
const User = db.user;
const Role = db.role;

//get list of user.
exports.getA2 = (req, res) => {
  res.status(200).send("A2 Content.");
};

exports.getA3 = (req, res) => {
  res.status(200).send("A3 Content.");
};

exports.getB1 = (req, res) => {
  res.status(200).send("B1 Content.");
};

exports.getB2 = (req, res) => {
  res.status(200).send("B2 Content.");
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

//xem lại.
exports.editA2 = (req, res) => {

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
            User.findOneAndUpdate({ username: req.body.username }, {
              $set: req.body
            }, { new: true })
              .exec((err, user) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                res.send({ message: "A2 was edited" });

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