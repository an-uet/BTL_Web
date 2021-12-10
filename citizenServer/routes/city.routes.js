const db = require("../models");
const City = db.city;
const { authJwt } = require("../middlewares");
const checkCity = require("../middlewares/checkCity")

//routes
module.exports = function (app) {

    //cấp mã.
    app.post("/city",
        [
            authJwt.verifyToken, authJwt.isA1,
            checkCity.checkDuplicateCity,
            checkCity.checkDuplicateCityID
        ],
        (req, res) => {
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
    );

    //xóa mã: truyền vào cityID.
    app.delete("/city",
        [authJwt.verifyToken, authJwt.isA1, checkCity.checkCityExisted],
        (req, res) => {
            City.findOneAndDelete({cityID: req.body.cityID})
                .exec((err, city) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "City was deleted" });

                })
        }
    )

    //sửa: 

    app.put("/city", 
    [authJwt.verifyToken, authJwt.isA2, checkCity.checkCityExisted],
    (req, res) => {
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
    )
}
