const db = require("../models");
const District = db.district;
const User = db.user;
const { authJwt } = require("../middlewares");
const checkDistrict = require("../middlewares/checkDistrict");

//routes
module.exports = function (app) {

    //cấp mã.
    app.post("/create/district",
        [
            authJwt.verifyToken, authJwt.isA2,
            checkDistrict.checkDuplicateDistrictID,
            checkDistrict.checkDuplicateDistrict
        ],
        (req, res) => {
            
            const district = new District({
                districtID: req.body.districtID,
                districtName: req.body.districtName
            });
            district.save((err, district) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                User.findById(req.userId).exec((err, user) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    district.city = user.city
                    district.save(err => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }
                        res.send({ message: "District was created successfully!" });
                      });
                  })
                
            })
        }
    );

    //xóa mã: truyền vào disctrictID.
    app.delete("/delete/district",
        [authJwt.verifyToken, authJwt.isA2, checkDistrict.checkDistrictExisted],
        (req, res) => {
            District.findOneAndDelete({districtID: req.body.districtID})
                .exec((err, district) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "district was deleted" });

                })
        }
    )

    app.put("/edit/district", 
    [authJwt.verifyToken, authJwt.isA2, checkDistrict.checkDistrictExisted],
    (req, res)

    )
}