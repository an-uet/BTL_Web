const db = require("../models");
const Ward = db.ward;
const User = db.user;
const District = db.district;

exports.postWard = (req, res) => {

    const ward = new Ward({
        wardID: req.body.wardID,
        wardName: req.body.wardName
    });
    ward.save((err, ward) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            ward.district = user.district;
            //console.log(user)
            var id = user.district;
            //console.log(id)
            District.findById(id).exec((err, district) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                ward.city = district.city;
                ward.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "ward was created successfully!" });
                });
            })
        });

    })
}

exports.deleteWard = (req, res) => {
    Ward.findOneAndDelete({ wardID: req.body.wardID })
        .exec((err, ward) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "ward was deleted" });

        })
}