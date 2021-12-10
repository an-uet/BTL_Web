const db = require("../models");
const District = db.district;
const User = db.user;

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
    District.findOneAndDelete({ districtID: req.body.districtID })
        .exec((err, district) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "district was deleted" });

        })
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