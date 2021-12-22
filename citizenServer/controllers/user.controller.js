const db = require("../models");
var bcrypt = require("bcryptjs");
const User = db.user;
const Role = db.role;

//get list of user.
exports.getAccount = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      User.find({ createBy: user.username })
        .populate("roles")
        .populate("city")
        .populate("district")
        .populate("ward")
        .populate("village")
        .exec((err, users) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send(users);

        })

    }
    else {
      res.send({ message: "loi" })
    }

  });
};

//xoa nhung tai khoan lien quan
exports.deleteUsers = (regex) => {
  User.deleteMany({ username: regex })
    .exec((err, users) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log("delete all user were created");

    })
}


//sua het user anh huong khi mã tinh/huyện/xa/lang thay doi
exports.editUsers_username = (regex, ID) => {
  User.find({ username: regex })
    .exec((err, users) => {
      if (err) {
        console.log(err)
        return;
      }
      users.forEach(user => {
        var oldUsername = user.username
        var newUsername = oldUsername.replace(regex, ID)
        user.username = newUsername
        var oldCreateBy = user.createBy
        var newCreateBy = oldCreateBy.replace(regex, ID)
        user.createBy = newCreateBy


        user.save(err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("cap nhat users thanh cong")
        });

      });
    })
}

//sửa password
exports.editUser_password = (ID, newPassword) => {
  User.findOne({ username: ID })
    .exec((err, user) => {
      if (err) {
        console.log(err)
        return;
      }
      if (user) {
        user.password = bcrypt.hashSync(newPassword, 8)

        user.save(err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("cap nhat pass thanh cong")
        });
      }

    })
}

//sửa time hoạt động
exports.editUser_time = (ID, newTimeStart, newTimeFinish) => {
  User.findOne({ username: ID })
    .exec((err, user) => {
      if (err) {
        console.log(err)
        return;
      }
      if (user) {
        console.log("tim thay user")
        user.timeStart = newTimeStart;
        user.timeFinish = newTimeFinish;
        //check active
        var currentTime = new Date();
        var time1 = new Date(newTimeStart);
        var time2 = new Date(newTimeFinish);
        if (time1 <= currentTime && currentTime <= time2) {
          user.active = 1
        }
        else {
          user.active = 0
        }
        user.save(err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("cap nhat time thanh cong")
        });
      }

    })
}


//B1 update hoàn thành công việc khai báo cư dân.
exports.completeTheWork = (req, res) => {
  if (req.body.completeTheWork == 1) {
    User.findByIdAndUpdate(req.userId, { complete: 1 }, function (err, user) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }


      User.find({})
        .populate("roles")
        .exec((err, users) => {
          if (err) {
            console.log("loi");
            return;
          }
          users.forEach(function (user) {

            if (user.roles[0].name == "A3") {
              User.find({ createBy: user.username }).exec((err, arr) => {
                ok = true;
                arr.forEach(element => {
                  if (element.complete == 0) {
                    ok = false;
                  }
                });
                if (ok == true) {
                  user.complete = 1;
                }
                else {
                  user.complete = 0;
                }

                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                });
              })
            }
          });
        });

      User.find({})
        .populate("roles")
        .exec((err, users) => {
          if (err) {
            console.log("loi");
            return;
          }
          users.forEach(function (user) {

            if (user.roles[0].name == "A2") {
              User.find({ createBy: user.username }).exec((err, arr) => {
                ok = true;
                arr.forEach(element => {
                  if (element.complete == 0) {
                    ok = false;
                  }
                });
                if (ok == true) {
                  user.complete = 1;
                }
                else {
                  user.complete = 0;
                }

                user.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                });
              })
            }
          });
        });
      res.status(200).send({ message: "Hoàn thành khai báo cư dân" })
    })
  }
}





