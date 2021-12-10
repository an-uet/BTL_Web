const db = require("../models");
const User = db.user;
const Village = db.village;
const Citizen = db.citizen;

exports.postCitizen = (req, res) => {

    const citizen = new Citizen({
        citizenID: req.body.citizenID,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        address: req.body.address
    });
    citizen.save((err, citizen) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            citizen.village = user.village;
            var id = user.village;
            Village.findById(id).exec((err, village) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                citizen.ward = village.ward
                citizen.district = village.district;
                citizen.city = village.city;
                citizen.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "citizen was created successfully!" });
                });
            })
        });

    })
}

exports.deleteCitizen = (req, res) => {
    Citizen.findOneAndDelete({ citizenID: req.body.citizenID })
        .exec((err, ward) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "citizen was deleted" });

        })
}