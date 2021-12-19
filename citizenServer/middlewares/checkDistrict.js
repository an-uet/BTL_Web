const db = require("../models");
const User = require("../models/user.model");
const District = db.district;


//kiểm tra trùng lặp thành phố
checkDuplicateDistrict = (req, res, next) => {
    // districtname
    District.findOne({
        districtName: req.body.districtName,
    }).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (district) {
            res.status(400).send({ message: "Failed! districtName is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra trùng lặp mã
checkDuplicateDistrictID = (req, res, next) => {
    // districtID
    District.findOne({
        districtID: req.body.districtID,
    }).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (district) {
            res.status(400).send({ message: "Failed! districtID is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra tồn tại thành phố/ tỉnh hay không:
checkDistrictExisted = (req, res, next) => {
    // districtID
    District.findById(req.body._id).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!district) {
            res.status(400).send({ message: "Failed! _id is not exited!" });
            return;
        }
        next();
    });
};

checkDistrictExistedByDistrictID = (req, res, next) => {
    // districtID
    
    District.findOne({districtID: req.body.districtID}).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!district) {
            res.status(400).send({ message: "Failed! districtID is not exited!" });
            return;
        }
        next();
    });
};

checkValidDistrictID = (req,res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if(req.body.districtID) {
            var re1 = "^";
            var re2 = "+[0-9]{2}$"
            var temp = re1.concat(user.username)
            var result = temp.concat(re2)
            if(req.body.districtID.match(result))
            {
                next();
            }
        else {
                res.status(400).send({ message: "Mã phải bắt đầu bằng: " + user.username + ". Vui lòng kiểm tra lại!" })
            }
        }
    })
}

const checkDistrict = {
    checkDuplicateDistrict,
    checkDuplicateDistrictID,
    checkDistrictExisted,
    checkDistrictExistedByDistrictID,
    checkValidDistrictID
   
  };
  
module.exports = checkDistrict;