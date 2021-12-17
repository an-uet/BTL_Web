const db = require("../models");
var bcrypt = require("bcryptjs");
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
exports.editUsers_username = (regex, ID) =>{
  User.find({username: regex})
  .exec((err, users) => {
    if (err) {
      console.log(err)
      return;
    }
    users.forEach(user => {
      var oldUsername = user.username
      var newUsername = oldUsername.replace(regex,ID)
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
      if(user){
     user.password = bcrypt.hashSync(newPassword, 8)
   
      user.save(err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("cap nhat users thanh cong")
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
      if(user)
      {
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
          console.log("cap nhat users thanh cong")
        });
      }
    
    })
}




