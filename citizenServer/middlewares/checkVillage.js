const db = require("../models");
const Village = db.village;


//kiểm tra trùng lặp thành phố
checkDuplicateVillage = (req, res, next) => {
    // villageName
    Village.findOne({
        villageName: req.body.villageName,
    }).exec((err, village) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (village) {
            res.status(400).send({ message: "Failed! villageName is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra trùng lặp mã
checkDuplicateVillageID = (req, res, next) => {
    // villageID
    Village.findOne({
        villageID: req.body.villageID,
    }).exec((err, village) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (village) {
            res.status(400).send({ message: "Failed! villageID is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra tồn tại thành phố/ tỉnh hay không:
checkVillageExisted = (req, res, next) => {
    // villageID
    Village.findById(req.body._id).exec((err, village) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!village) {
            res.status(400).send({ message: "Failed! _id is not exited!" });
            return;
        }
        next();
    });
};

checkVillageExistedByVillageID = (req, res, next) => {
    // villageID
    Village.findOne({villageID: req.body.villageID}).exec((err, village) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!village) {
            res.status(400).send({ message: "Failed! villageID is not exited!" });
            return;
        }
        next();
    });
};

const checkVillage = {
    checkDuplicateVillage,
    checkDuplicateVillageID,
    checkVillageExisted,
    checkVillageExistedByVillageID

};

module.exports = checkVillage;