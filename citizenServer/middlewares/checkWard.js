const db = require("../models");
const Ward = db.ward;


//kiểm tra trùng lặp thành phố
checkDuplicateWard = (req, res, next) => {
    // Wardname
    Ward.findOne({
        wardName: req.body.wardName,
    }).exec((err, ward) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (ward) {
            res.status(400).send({ message: "Failed! wardName is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra trùng lặp mã
checkDuplicateWardID = (req, res, next) => {
    // wardID
    Ward.findOne({
        wardID: req.body.wardID,
    }).exec((err, ward) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (ward) {
            res.status(400).send({ message: "Failed! wardID is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra tồn tại thành phố/ tỉnh hay không:
checkWardExisted = (req, res, next) => {
    // wardID
    Ward.findOne({
        wardID: req.body.wardID,
    }).exec((err, ward) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!ward) {
            res.status(400).send({ message: "Failed! wardID is not exited!" });
            return;
        }
        next();
    });
};

const checkWard = {
    checkDuplicateWard,
    checkDuplicateWardID,
    checkWardExisted
   
  };
  
module.exports = checkWard;