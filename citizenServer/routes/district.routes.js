const db = require("../models");
const District = db.district;
const { authJwt } = require("../middlewares");


//kiểm tra trùng lặp thành phố
checkDuplicateDistrict = (req, res, next) => {
    // districtname
    District.findOne({
        districtName: req.body.name,
    }).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (district) {
            res.status(400).send({ message: "Failed! districtName is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra trùng lặp mã
checkDuplicateDistrictID = (req, res, next) => {
    // districtID
    District.findOne({
        districtID: req.body.ID,
    }).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (district) {
            res.status(400).send({ message: "Failed! districtID is already exited!" });
            return;
        }
        next();
    });
};

//kiểm tra tồn tại thành phố/ tỉnh hay không:
checkDistrictExisted = (req, res, next) => {
    // districtID
    District.findOne({
        districtID: req.body.ID,
    }).exec((err, district) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!district) {
            res.status(400).send({ message: "Failed! districtID is not exited!" });
            return;
        }
        next();
    });
};


//routes
module.exports = function (app) {

    //cấp mã.
    app.post("/create/district",
        [
            authJwt.verifyToken, authJwt.isA2,
            checkDuplicateDistrict,
            checkDuplicateDistrictID
        ],
        (req, res) => {
            const district = new District({
                districtID: req.body.ID,
                districtName: req.body.name
            });

            district.save((err, district) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "District was created successfully!" });
            })
        }
    );

    //xóa mã: truyền vào disctrictID.
    app.delete("/delete/district",
        [authJwt.verifyToken, authJwt.isA2, checkDistrictExisted],
        (req, res) => {
            District.findOneAndDelete({districtID: req.body.ID})
                .exec((err, district) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "district was deleted" });

                })
        }
    )

    //sửa: 
}