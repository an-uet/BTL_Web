const db = require("../models");
const City = db.city;
const { authJwt } = require("../middlewares");


//kiểm tra trùng lặp thành phố
checkDuplicateCity = (req, res, next) => {
    // cityname
    City.findOne({
        cityName: req.body.cityName,
    }).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (city) {
            res.status(400).send({ message: "Failed! cityName is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra trùng lặp mã
checkDuplicateCityID = (req, res, next) => {
    // cityID
    City.findOne({
        cityID: req.body.cityID,
    }).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (city) {
            res.status(400).send({ message: "Failed! cityID is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra tồn tại thành phố/ tỉnh hay không:
checkCityExisted = (req, res, next) => {
    // cityID
    City.findOne({
        cityID: req.body.cityID,
    }).exec((err, city) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!city) {
            res.status(400).send({ message: "Failed! cityID is not exited!" });
            return;
        }
        next();
    });
};


//routes
module.exports = function (app) {

    //cấp mã.
    app.post("/create/city",
        [
            authJwt.verifyToken, authJwt.isA1,
            checkDuplicateCity,
            checkDuplicateCityID
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
    app.delete("/delete/city",
        [authJwt.verifyToken, authJwt.isA1, checkCityExisted],
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
}
