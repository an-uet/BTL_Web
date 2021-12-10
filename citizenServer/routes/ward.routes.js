const db = require("../models");
const Ward = db.ward;
const User = db.user;
const District = db.district;
const { authJwt } = require("../middlewares");
const checkWard = require("../middlewares/checkWard");

module.exports = function (app) {

    //cấp mã.
    app.post("/ward",
        [
            authJwt.verifyToken, authJwt.isA3,
            checkWard.checkDuplicateWard,
            checkWard.checkDuplicateWardID
        ],
        (req, res) => {

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

    );

    //xóa mã: truyền vào wardID.// xu li khi xoa ma thi xoas tai khoan hay khong?
    app.delete("/ward",
        [authJwt.verifyToken, authJwt.isA3, checkWard.checkWardExisted],
        (req, res) => {
            Ward.findOneAndDelete({wardID: req.body.wardID})
                .exec((err, ward) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "ward was deleted" });

                })
        }
    )




}