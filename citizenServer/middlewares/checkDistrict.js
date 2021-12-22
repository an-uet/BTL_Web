const db = require("../models");
const User = require("../models/user.model");
const District = db.district;


//kiểm tra trùng lặp thành phố
checkDuplicateDistrict = (req, res, next) => {
    // districtname
    District.findOne({
        districtName: req.body.districtName,
        districtID: req.body.districtID
    }).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (district) {
            res.status(400).send({ message: "Failed! district is already exited!" });
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

    District.findOne({ districtID: req.body.districtID }).exec((err, district) => {
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

checkValidDistrictID = (req, res, next) => {
    if(req.body.districtID){
        User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.districtID) {
            var re1 = "^";
            var re2 = "+[0-9]{2}$"
            var temp = re1.concat(user.username)
            var result = temp.concat(re2)
            if (req.body.districtID.match(result)) {
                next();
            }
            else {
                res.status(400).send({ message: "Mã phải bắt đầu bằng: " + user.username + ". Vui lòng kiểm tra lại!" })
            }
        }
    }) 
    }
    else {
        next();
    }
   
}

checkDistrictNameExisted = (req, res, next) => {
    if (req.body.districtName) {
        District.findOne({
            districtName: req.body.districtName,
        }).exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!district) {
                res.status(400).send({ message: "Không tìm thấy tên quận/huyện" });
                return;
            }
            next();
        });
    }
    else {
        next()
    }

}

const checkDistrict = {
    checkDuplicateDistrict,
    checkDuplicateDistrictID,
    checkDistrictExisted,
    checkDistrictExistedByDistrictID,
    checkValidDistrictID,
    checkDistrictNameExisted

};

module.exports = checkDistrict;