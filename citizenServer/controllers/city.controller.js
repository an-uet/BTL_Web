const db = require("../models");
const City = db.city;
const locationController = require('./location.controller');
const userController = require('./user.controller');
const citizenController = require('./citizen.controller')

exports.postCity = (req, res) => {
    const city = new City({
        cityID: req.body.cityID,
        cityName: req.body.cityName
    });

    city.save((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "City was created successfully!" });
    })
}

exports.deleteCity = (req, res) => {
    var re = "^";
    var result = re.concat(req.body.cityID)
    var regax = new RegExp(result, "g")

    City.findOneAndDelete({ cityID: req.body.cityID })
        .exec((err, city) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            citizenController.deleteCitizensOfCity(city._id);

        })

        locationController.deleteDistricts(regax);
        locationController.deleteVillages(regax);
        locationController.deleteWards(regax);
        userController.deleteUsers(regax);
        

        res.send({ message: "City was deleted" });
}

exports.putCity = (req, res) => {
    City.findOneAndUpdate({ cityID: req.body.cityID }, {
        $set: req.body
    }, { new: true })
        .exec((err, city) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "City was edited" });

        })
}