const config = require("../config/auth.config")
const db = require("../models");
const User = db.user;
const Role = db.role;
const City = db.city;
const District = db.district;
const Ward = db.ward;
const Village = db.village;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { village } = require("../models");



//signup A1

exports.signupA1 = (req, res) => {

  result = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  regex = new RegExp(result)
  if (req.body.password.match(regex)) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      active: 1,

    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.findOne({ name: "A1" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });

    });

  }

  else {
    res.status(400).send({ message: "mat khau khong hop le" })
  }

};


//signup user: A2
exports.signupA2 = (req, res) => {

  result = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  regex = new RegExp(result)

  if (req.body.password.match(regex)) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      timeStart: req.body.timeStart,
      timeFinish: req.body.timeFinish,
      complete: 0,
    });

    var currentTime = new Date();
    if (req.body.timeStart && req.body.timeFinish) {
      var time1 = new Date(req.body.timeStart);
      var time2 = new Date(req.body.timeFinish);
      if (time1 <= currentTime && currentTime <= time2) {
        user.active = 1
      }
      else {
        user.active = 0
      }
    }

    User.findById(req.userId).exec((err, temp) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.createBy = temp.username
    })

    Role.findOne({ name: "A2" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];

      City.findOne({ cityID: req.body.username }, (err, city) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (city) {
          user.city = city._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
        else {
          res.status(400).send({ message: "Thành phố/tỉnh này chưa được cấp mã nên không thể cấp tài khoản." })
        }


      });
    });
  }
  else {
    res.status(400).send({ message: "mat khau khong hop le" })
  }

};

//signup user: A3
exports.signupA3 = (req, res) => {
  result = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  regex = new RegExp(result)
  if (req.body.password.match(regex)) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      timeStart: req.body.timeStart,
      timeFinish: req.body.timeFinish,
      complete: 0
    });


    var currentTime = new Date();
    if (req.body.timeStart && req.body.timeFinish) {
      var time1 = new Date(req.body.timeStart);
      var time2 = new Date(req.body.timeFinish);
      if (time1 <= currentTime && currentTime <= time2) {
        user.active = 1
      }
      else {
        user.active = 0
      }
    }

    User.findById(req.userId).exec((err, temp) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.createBy = temp.username
    })

    Role.findOne({ name: "A3" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];

      District.findOne({ districtID: req.body.username }, (err, district) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (district) {
          user.district = district._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
        else {
          res.status(400).send({ message: "Quận/huyện này chưa được cấp mã nên không thể cấp tài khoản." })

        }


      });
    });
  }
  else {
    res.status(400).send({ message: "mat khau khong hop le" })
  }

};


//signup user: B1
exports.signupB1 = (req, res) => {
  result = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  regex = new RegExp(result)
  if (req.body.password.match(regex)) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      timeStart: req.body.timeStart,
      timeFinish: req.body.timeFinish,
      complete: 0
    });


    var currentTime = new Date();
    if (req.body.timeStart && req.body.timeFinish) {
      var time1 = new Date(req.body.timeStart);
      var time2 = new Date(req.body.timeFinish);
      if (time1 <= currentTime && currentTime <= time2) {
        user.active = 1
      }
      else {
        user.active = 0
      }
    }

    User.findById(req.userId).exec((err, temp) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.createBy = temp.username
    })

    Role.findOne({ name: "B1" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      user.roles = [role._id];

      Ward.findOne({ wardID: req.body.username }, (err, ward) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (ward) {
          user.ward = ward._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
        else {
          res.status(400).send({ message: "Xã/phường này chưa được cấp mã nên không thể cấp tài khoản" })
        }


      });
    });

  }
  else {
    res.status(400).send({ message: "mat khau khong hop le" })
  }
};

//signup user: B2
exports.signupB2 = (req, res) => {
  result = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  regex = new RegExp(result)
  if (req.body.password.match(regex)) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      timeStart: req.body.timeStart,
      timeFinish: req.body.timeFinish
    });

    var currentTime = new Date();
    if (req.body.timeStart && req.body.timeFinish) {
      var time1 = new Date(req.body.timeStart);
      var time2 = new Date(req.body.timeFinish);
      if (time1 <= currentTime && currentTime <= time2) {
        user.active = 1
      }
      else {
        user.active = 0
      }
    }

    User.findById(req.userId).exec((err, temp) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.createBy = temp.username
    })

    Role.findOne({ name: "B2" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];

      Village.findOne({ villageID: req.body.username }, (err, village) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (village) {
          user.village = village._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
        else {
          res.status(400).send({ message: "Làng/xóm này chưa được cấp mã nên không thể cấp tài khoản." })
        }


      });
    });
  }
  else {
    res.status(400).send({ message: "mat khau khong hop le" })
  }
};



//cap nhat database truong active.
function updateActiveField() {
  var currentTime = new Date();
  User.find({}).exec((err, users) => {
    if (err) {
      console.log("loi");
      return;
    }

    users.forEach(function (user) {
      if (user.timeStart && user.timeFinish) {
        var time1 = new Date(user.timeStart);
        var time2 = new Date(user.timeFinish);
        if (time1 <= currentTime && currentTime <= time2) {
          user.active = 1
        }
        else {

          user.active = 0;
        }

        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          //console.log("cap nhat thoi gian hoat dong thanh cong")
        });
      }
    });
  });


  User.find({}).exec((err, users) => {
    if (err) {
      console.log("loi");
      return;
    }

    users.forEach(function (user) {
      if (user.active == 0) {
        User.find({ createBy: user.username }).exec((err, arr) => {
          if (err) {
            console.log("loi");
            return;
          }
          arr.forEach(function (temp) {
            temp.active = 0;
            temp.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              // console.log("thanh cong")
            });
          })
        })
      }
    });
  });
}


//signin
exports.signin = (req, res) => {
  updateActiveField();
  User.findOne({
    username: req.body.username
  })
    .populate("roles")
    .populate("city")
    .populate("district")
    .populate("ward")
    .populate("village")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 14400 // 4 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());

      }
      var city_name = ""
      var district_name = ""
      var ward_name = ""
      var village_name = ""
      if (user.city) {
        city_name = user.city.cityName
      }
      if (user.district) {
        district_name = user.district.districtName
      }
      if (user.ward) {
        ward_name = user.ward.wardName
      }
      if (user.village) {
        village_name = user.village.villageName
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        role: authorities,
        createBy: user.createBy,
        timeStart: user.timeStart,
        timeFinish: user.timeFinish,
        city: city_name,
        district: district_name,
        ward: ward_name,
        village: village_name,
        accessToken: token,
        isActive: user.active,
        isComplete: user.complete
      });
    });
};



