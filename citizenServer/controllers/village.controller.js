const db = require("../models");
const Village = db.village;
const User = db.user;
const Ward = db.ward;
const userController = require('./user.controller')
const citizenController = require('./citizen.controller')


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
    var re = "^";
    var result = re.concat(req.body.villageID)
    var regax = new RegExp(result, "g")

    Village.findOneAndDelete({ villageID: req.body.villageID })
        .exec((err, village) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            citizenController.deleteCitizensOfVillage(village._id)

        })
        userController.deleteUsers(regax)
        res.send({ message: "Village was deleted" });
}


