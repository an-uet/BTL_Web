const db = require("../models");
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
    District.findOne({
        districtID: req.body.districtID,
    }).exec((err, district) => {
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

const checkDistrict = {
    checkDuplicateDistrict,
    checkDuplicateDistrictID,
    checkDistrictExisted
   
  };
  
module.exports = checkDistrict;