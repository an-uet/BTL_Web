const db = require("../models");
const City = db.city;



//kiểm tra trùng lặp thành phố
checkDuplicateCity = (req, res, next) => {
    // cityname
    City.findOne({
        cityName: req.body.cityName,
    }).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (city) {
            res.status(400).send({ message: "Failed! cityName is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra trùng lặp mã
checkDuplicateCityID = (req, res, next) => {
    // cityID
    City.findOne({
        cityID: req.body.cityID,
    }).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (city) {
            res.status(400).send({ message: "Failed! cityID is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra tồn tại thành phố/ tỉnh hay không:
checkCityExisted = (req, res, next) => {
    // cityID
    City.findById(req.body._id).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!city) {
            res.status(400).send({ message: "Failed! _id is not exited!" });
            return;
        }
        next();
    });
};

checkCityExistedByCityID = (req, res, next) => {
    // cityID
    City.findOne({cityID: req.body.cityID}).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!city) {
            res.status(400).send({ message: "Failed! cityID is not exited!" });
            return;
        }
        next();
    });
};

const checkCity = {
    checkDuplicateCity,
    checkDuplicateCityID,
    checkCityExisted,
    checkCityExistedByCityID
   
  };
  
module.exports = checkCity;