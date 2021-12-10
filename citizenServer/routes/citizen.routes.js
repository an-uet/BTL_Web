const db = require("../models");
const Citizen = db.citizen;
const User = db.user;
const Village = db.village;
const District = db.district;
const Ward = db.ward;
const City = db.city;
const { authJwt } = require("../middlewares");
const checkCitizen = require("../middlewares/checkCitizen");

module.exports = function (app) {

    //cấp mã.
    app.post("/citizen",
        [
            authJwt.verifyToken, authJwt.isB2,
            checkCitizen.checkDuplicateCitizenID
        ],
        (req, res) => {

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

    );


        //xóa mã: truyền vào citizenID
        app.delete("/citizen",
        [authJwt.verifyToken, authJwt.isB2, checkCitizen.checkCitizenExisted],
        (req, res) => {
            Citizen.findOneAndDelete({citizenID: req.body.citizenID})
                .exec((err, ward) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "citizen was deleted" });

                })
        }
    )





}