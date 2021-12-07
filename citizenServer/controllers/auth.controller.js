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

  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    
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
};


//signup user: A2
exports.signupA2 = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    createBy: 'A1',
    timeStart: req.body.timeStart,
    timeFinish: req.body.timeFinish
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.findOne({ name: "A2" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      
      City.findOne({ cityID: req.body.username}, (err, city) => {
        if (err) {
           res.status(500).send({ message: err });
          return;
        }
          user.city = city._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          }); 
        
      });
    });
  });
};

//signup user: A3
exports.signupA3 = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    createBy: req.user.CityID,
    timeStart: req.body.timeStart,
    timeFinish: req.body.timeFinish
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "A3" }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      District.findOne({ districtID: req.body.username}, (err, district) => {
        if (err) {
           res.status(500).send({ message: err });
          return;
        }
          user.district = district._id;
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          }); 
        
      });
    });

  });
};


//signup user: B1
exports.signupB1 = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    createBy: 'A3',
    timeStart: req.body.timeStart,
    timeFinish: req.body.timeFinish
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "B1" }, (err, role) => {
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
};

//signup user: B2
exports.signupB2 = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    createBy: 'B1',
    timeStart: req.body.timeStart,
    timeFinish: req.body.timeFinish
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findOne({ name: "B2" }, (err, role) => {
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
};


//signin
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles")
    .populate("city")
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
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());

      }
      var city_name = ""
      if (user.city) {
        city_name = user.city.cityName
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        role: authorities,
        createBy: user.createBy,
        timeStart: user.timeStart,
        timeFinish: user.timeFinish,
        city: city_name,
        district: "",
        ward: "",
        village: "",
        accessToken: token

      });
    });
};
