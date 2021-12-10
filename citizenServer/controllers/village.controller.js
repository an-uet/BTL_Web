const db = require("../models");
const Village = db.village;
const User = db.user;
const District = db.district;
const Ward = db.ward;
const City = db.city;

exports.postVillage = (req, res) => {

    const village = new Village({
        villageID: req.body.villageID,
        villageName: req.body.villageName
    });
    village.save((err, village) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            village.ward = user.ward;
            //console.log(user)
            var id = user.ward;
            //console.log(id)
            Ward.findById(id).exec((err, ward) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                village.district = ward.district;
                village.city = ward.city;
                village.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "village was created successfully!" });
                });
            })
        });

    })
}

exports.deleteVillage = (req, res) => {
    Village.findOneAndDelete({ villageID: req.body.villageID })
        .exec((err, village) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "village was deleted" });

        })
}


