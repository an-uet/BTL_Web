const { city } = require("../models");
const db = require("../models");
const User = db.user;
const Village = db.village;
const Citizen = db.citizen;
const City = db.city;

exports.postCitizen = (req, res) => {

    const citizen = new Citizen({
        citizenID: req.body.citizenID,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        address: req.body.address,
        nativeVillage: req.body.nativeVillage,
        religion: req.body.religion,
        job: req.body.job


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

// xóa một cư dân.
exports.deleteCitizen = (req, res) => {
    Citizen.findOneAndDelete({ citizenID: req.body.citizenID })
        .exec((err, citizen) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "citizen was deleted" });

        })
}

//xoa cua dan cua mot tinh
exports.deleteCitizensOfCity = (_id) => {
        Citizen.deleteMany({ city: _id })
        .exec((err, citizens) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("delete all citizens of this city");
        })
  }

  //xoa cua dan cua mot huyee+n
exports.deleteCitizensOfDistrict = (_id) => {
    Citizen.deleteMany({ district: _id })
    .exec((err, citizens) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("delete all citizens of this district");
    })
}

//xoa cua dan cua mot xa
exports.deleteCitizensOfWard = (_id) => {
    Citizen.deleteMany({ ward: _id })
    .exec((err, citizens) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("delete all citizens of this ward");
    })
}

//xoa cua dan cua mot lang
exports.deleteCitizensOfVillage = (_id) => {
    Citizen.deleteMany({village: _id })
    .exec((err, citizens) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log("delete all citizens of this village");
    })
}


exports.getCitizen = (req, res) => {
    Citizen.find()
    .populate("village","villageName villageID")
    .populate("city", "cityName cityID")
    .populate("district", "districtName districtID")
    .populate("ward", "wardName wardID")
    .exec((err, citizens) =>{
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(citizens);

    })
}