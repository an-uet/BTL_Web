const db = require("../models");
const City = db.city;

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
    City.findOneAndDelete({cityID: req.body.cityID})
        .exec((err, city) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "City was deleted" });

        })
}

exports.putCity = (req, res) => {
    City.findOneAndUpdate({cityID: req.body.cityID}, {
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