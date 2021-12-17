const db = require("../models");
const District = db.district;
const User = db.user;
const locationController = require('./location.controller');
const userController = require('./user.controller');
const citizenController = require('./citizen.controller')

exports.postDistrict = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        var name = user.username;
        re = "+[0-9]{2}$";
        result = name.concat(re);
        regex = new RegExp(result, "g")
        if (req.body.districtID.match(regex)) {
            const district = new District({
                districtID: req.body.districtID,
                districtName: req.body.districtName
            });
            district.save((err, district) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                User.findById(req.userId).exec((err, user) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    district.city = user.city
                    district.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "District was created successfully!" });
                    });
                })

            })
        }
        else {
            res.status(400).send({ message: "Mã phải bắt đầu bằng: " + name + ". Vui lòng kiểm tra lại!" })
    }
    })
    

}

exports.deleteDistrict = (req, res) => {
    var re = "^";
    var result = re.concat(req.body.districtID)
    var regex = new RegExp(result, "g")

    District.findOneAndDelete({ districtID: req.body.districtID })
        .exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            citizenController.deleteCitizensOfDistrict(district._id)
        })

    locationController.deleteVillages(regex);
    locationController.deleteWards(regex);
    userController.deleteUsers(regex);

    res.send({ message: "district was deleted" });
}

exports.putDistrict = (req, res) => {
    District.findById(req.body._id)
        .exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.districtID) {
                var re = "^";
                var result = re.concat(district.districtID)
                var regex = new RegExp(result, "g")
                district.districtID = req.body.districtID;
                locationController.putWards(regex, req.body.districtID)
                locationController.putVillages(regex, req.body.districtID)
                userController.editUsers_username(regex, req.body.districtID)

            }
            if (req.body.districtName) {
                district.districtName = req.body.districtName;
            }
            district.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "district was edited" });
            })

        })

    District.findById(req.body._id)
        .exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.timeStart && req.body.timeFinish) {
                userController.editUser_time(district.districtID, req.body.timeStart, req.body.timeFinish)
            }
            if (req.body.newPassword) {
                userController.editUser_password(district.districtID, req.body.newPassword)
            }
        })
}
