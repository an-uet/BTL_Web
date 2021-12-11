const db = require("../models");
const District = db.district;
const User = db.user;
const locationController = require('./location.controller');
const userController = require('./user.controller');
const citizenController = require('./citizen.controller')

exports.postDistrict = (req, res) => {

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

exports.deleteDistrict = (req, res) => {
    var re = "^";
    var result = re.concat(req.body.districtID)
    var regax = new RegExp(result, "g")

    District.findOneAndDelete({ districtID: req.body.districtID })
        .exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            citizenController.deleteCitizensOfDistrict(district._id)
        })

        locationController.deleteVillages(regax);
        locationController.deleteWards(regax);
        userController.deleteUsers(regax);

        res.send({ message: "district was deleted" });
}

exports.putDistrict = (req, res) => {
    District.findOneAndUpdate({ districtID: req.body.districtID }, {
        $set: req.body
    }, { new: true })
        .exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "district was edited" });

        })
}