const { city, citizen } = require("../models");
const db = require("../models");
const User = db.user;
const Village = db.village;
const Citizen = db.citizen;
const City = db.city;
const Ward = db.ward;



//khai báo cư dân cho B2
exports.postCitizenForB2 = (req, res) => {

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

                citizen.city = village.city;
                citizen.district = village.district;
                citizen.ward = village.ward
                citizen.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "citizen was created successfully!" });
                });
            })
        });

    
}

//khai báo cư dân B1: lúc nhập thì nhập thêm 1 trường villageName.
exports.postCitizenForB1 = (req, res) => {

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


    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        citizen.ward = user.ward;
        var id = user.ward;
        
        Ward.findById(id).exec((err, ward) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            citizen.city = ward.city;
            citizen.district = ward.district;
        })
        Village.findOne({ villageName: req.body.villageName }).exec((err, village) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (village) {
                if(village.ward.equals(user.ward)) {
                    citizen.village = village._id;
                    citizen.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "citizen was created successfully!" });
                    });
                }
                else {
                    res.status(400).send({ message: "công dân ở làng này không thuộc quyền khai báo của bạn" })
                }

            }
            else {
                res.status(400).send({ message: "làng này không tồn tại" })
            }
        })
    });
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

//xoa cua dan cua mot huyen
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
    Citizen.deleteMany({ village: _id })
        .exec((err, citizens) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("delete all citizens of this village");
        })
}



//lọc
exports.searchAddress = (req, res) => {
    var list = [];
    Citizen.find({})
        .populate("village", "villageName villageID")
        .populate("city", "cityName cityID")
        .populate("district", "districtName districtID")
        .populate("ward", "wardName wardID")
        .exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            citizens.forEach(citizen => {
                if (citizen.city.cityName == req.body.cityName && citizen.district.districtName == req.body.districtName && citizen.ward.wardName == req.body.wardName && citizen.village.villageName == req.body.villageName) {
                    list.push(citizen)
                } else if (citizen.city.cityName == req.body.cityName && citizen.district.districtName == req.body.districtName && citizen.ward.wardName == req.body.wardName) {
                    list.push(citizen)
                } else if (citizen.city.cityName == req.body.cityName && citizen.district.districtName == req.body.districtName) {
                    list.push(citizen)
                } else if (citizen.city.cityName == req.body.cityName) {
                    list.push(citizen)
                }
            })
            res.status(200).send(list);
            //Hiện số dân đã nhập trên tỉnh/huyện/xã/ làng đó
            console.log(list.length);

        })
}

//tìm thông tin 1 người dân
exports.searchCitizen = (req, res) => {
    Citizen.findOne({ citizenID: req.body.citizenID })
        .populate("village")
        .populate("city")
        .populate("district")
        .populate("ward")
        .exec((err, citizen) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizen);
        })
}


exports.sortName = (req, res) => {
    Citizen.find().sort({ name: 1 })
        .populate("village")
        .populate("city")
        .populate("district")
        .populate("ward")
        .exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizens);
        })
}

exports.countMale = (req, res) => {
    Citizen.countDocuments({ gender: "Nam" }, function (err, count) {
        if (err) {
            console.log(err)
        } else {
            console.log("nam:", count);
            res.status(200).send({
                nam: count,
            }
            );
        }
    });

}

exports.countFemale = (req, res) => {
    Citizen.countDocuments({ gender: "Nữ" }, function (err, count) {
        if (err) {
            console.log(err)
        } else {
            console.log("Nữ :", count)
            res.status(200).send({
                nu: count,
            }
            );
        }
    });

}


exports.caculationOld = (req, res) => {
    Citizen.find({})
        .populate("village", "villageName villageID")
        .populate("city", "cityName cityID")
        .populate("district", "districtName districtID")
        .populate("ward", "wardName wardID")
        .exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            var sum1 = 0;
            var sum2 = 0;
            var sum3 = 0;
            var current = new Date().getFullYear();

            citizens.forEach(citizen => {
                var birthday = new Date(citizen.dateOfBirth).getFullYear();
                var old = current - birthday;
                if (0 <= old && old <= 14) {
                    sum1 = sum1 + 1;
                } //dưới độ tuổi lao động
                else if (15 <= old && old <= 59) {
                    sum2 += 1;
                } // trong độ tuổi lao động
                else if (old >= 60) {
                    sum3 += 1; // trên độ tuổi lao động
                }


            })
            //Hiện số dân đã nhập trên tỉnh/huyện/xã/ làng đó
            console.log(sum1);
            console.log(sum2);
            console.log(sum3);
            res.status(200).send({
                sum1: sum1,
                sum2: sum2,
                sum3: sum3
            })

        })
}


//lay danh sach cu dan cua ca nuoc.
exports.getAllCitizens = (req, res) => {
    var list = [];
    Citizen.find()
        .populate("city", "cityName cityID")
        .populate("district", "districtName districtID")
        .populate("ward", "wardName wardID")
        .populate("village", "villageName villageID")
        .exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizens);

        })
}

//lay danh sach cu dan cua mot thanh pho/tinh
exports.getCitizensOfCity = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Citizen.find({ city: user.city }).exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizens)
        })
    })
}

//lay danh sach citizen cua 1 quan/huyen
exports.getCitizensOfDistrict = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Citizen.find({ district: user.district }).exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizens)
        })
    })
}

//lay danh sach cu dan cua mot xa/phuong
exports.getCitizensOfWard = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Citizen.find({ ward: user.ward }).exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizens)
        })
    })
}


//lay danh sach cu dan cua mot lang
exports.getCitizensOfVillage = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Citizen.find({ village: user.village }).exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send(citizens)
        })
    })
}

