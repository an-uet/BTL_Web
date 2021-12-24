const { city, citizen, district } = require("../models");
const db = require("../models");
const { distinct } = require("../models/user.model");
const User = db.user;
const Village = db.village;
const Citizen = db.citizen;
const City = db.city;
const Ward = db.ward;
const District = db.district;

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
                res.send(citizen);
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
        console.log(id)

        Ward.findById(id).exec((err, ward) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            console.log("ward: " + ward)
            citizen.city = ward.city;
            citizen.district = ward.district;
        })
        Village.findOne({ villageName: req.body.villageName }).exec((err, village) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (village) {
                if (village.ward.equals(user.ward)) {
                    citizen.village = village._id;
                    citizen.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send(citizen);
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


//lấy danh sách của cu dân tùy thuộc vào tài khoản đăng nhập là gì.
exports.getCitizens = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //check city account
        re1 = "^[0-9]{2}$"
        regex1 = new RegExp(re1, "g")

        //check district account
        re2 = "^[0-9]{4}$"
        regex2 = new RegExp(re2, "g")

        //check ward account
        re3 = "^[0-9]{6}$"
        regex3 = new RegExp(re3, "g")

        //check village account
        re4 = "^[0-9]{8}$"
        regex4 = new RegExp(re4, "g")

        //get citizens of city.
        if (user.username.match(regex1)) {
            Citizen.find({ city: user.city })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send(citizens)
                })
        }


        //get citizens of district
        else if (user.username.match(regex2)) {
            Citizen.find({ district: user.district })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send(citizens)
                })


        }


        //get citizens of ward
        else if (user.username.match(regex3)) {
            Citizen.find({ ward: user.ward })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send(citizens)
                })

        }

        //get citizens of village
        else if (user.username.match(regex4)) {
            Citizen.find({ village: user.village })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.status(200).send(citizens)
                })

        }
        //get all citizens
        else {
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

    })
}

//sửa thông tin một người dân
exports.putCitizen = (req, res) => {
    ok = 1;
    Citizen.findById(req.body._id)
        .exec((err, citizen) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (citizen) {

                if (req.body.villageName) {
                    User.findById(req.userId).exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        Village.findOne({ villageName: req.body.villageName })
                            .exec((err, village) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }
                                if (village) {
                                    if (village.ward.equals(user.ward)) {
                                        citizen.village = village._id;

                                        if (req.body.citizenID) {
                                            citizen.citizenID = req.body.citizenID;
                                        }
                                        if (req.body.name) {
                                            citizen.name = req.body.name;

                                        }
                                        if (req.body.nativeVillage) {
                                            citizen.nativeVillage = req.body.nativeVillage

                                        }
                                        if (req.body.dob) {
                                            citizen.dateOfBirth = req.body.dob

                                        }
                                        if (req.body.gender) {
                                            citizen.gender = req.body.gender;

                                        }
                                        if (req.body.address) {
                                            citizen.address = req.body.address;

                                        }
                                        if (req.body.religion) {
                                            citizen.religion = req.body.religion
                                        }
                                        if (req.body.job) {
                                            citizen.job = req.body.job
                                        }

                                        citizen.save(err => {
                                            if (err) {
                                                res.status(500).send({ message: err });
                                                return;
                                            }
                                            console.log("save villageName ok")
                                            res.status(200).send(citizen)
                                        });
                                    }
                                    else {
                                        console.log("meomeomoe")
                                        res.send({ message: "công dân ở làng này không thuộc quyền khai báo của bạn" });
                                        return;

                                    }
                                }
                                else {
                                    res.send({ message: "làng này không tồn tại" });
                                    return;
                                }
                            })

                    })
                }

                else {
                    if (req.body.citizenID) {
                        citizen.citizenID = req.body.citizenID;
                    }
                    if (req.body.name) {
                        citizen.name = req.body.name;

                    }
                    if (req.body.nativeVillage) {
                        citizen.nativeVillage = req.body.nativeVillage

                    }
                    if (req.body.dob) {
                        citizen.dateOfBirth = req.body.dob

                    }
                    if (req.body.gender) {
                        citizen.gender = req.body.gender;

                    }
                    if (req.body.address) {
                        citizen.address = req.body.address;

                    }
                    if (req.body.religion) {
                        citizen.religion = req.body.religion
                    }
                    if (req.body.job) {
                        citizen.job = req.body.job
                    }

                    citizen.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send(citizen);
                    });

                }


            }
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



//thống kê
//theo tuổi


function caculateOld2(citizens) {
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var sum4 = 0;
    var sum5 = 0;
    var sum6 = 0;
    var sum7 = 0;
    var sum8 = 0;
    var sum9 = 0;
    var sum10 = 0;
    var sum11 = 0;
    var current = new Date().getFullYear();

    citizens.forEach(citizen => {
        var birthday = new Date(citizen.dateOfBirth).getFullYear();
        var old = current - birthday;
        if (0 <= old && old <= 10) {
            sum1 = sum1 + 1;
        } //dưới độ tuổi lao động
        else if (10 < old && old <= 20) {
            sum2 += 1;
        }
        else if (20 < old && old <= 30) {
            sum3 += 1;
        }
        else if (30 < old && old <= 40) {
            sum4 += 1;
        }
        else if (40 < old && old <= 50) {
            sum5 += 1;
        }
        else if (50 < old && old <= 60) {
            sum6 += 1;
        }
        else if (60 < old && old <= 70) {
            sum7 += 1;
        }
        else if (70 < old && old <= 80) {
            sum8 += 1;
        }
        else if (80 < old && old <= 90) {
            sum9 += 1;
        }
        else if (90 < old && old <= 100) {
            sum10 += 1;
        }
        else if (100 < old) {
            sum11 += 1;
        }


    })
    //Hiện số dân đã nhập trên tỉnh/huyện/xã/ làng đó
    console.log(sum1);
    console.log(sum2);
    console.log(sum3);

    return {
        sum1: sum1,
        sum2: sum2,
        sum3: sum3,
        sum4: sum4,
        sum5: sum5,
        sum6: sum6,
        sum7: sum7,
        sum8: sum8,
        sum9: sum9,
        sum10: sum10,
        sum11: sum11
    }
}


//đếm số người theo giới tính.
function countGender(citizens, gender) {
    sum = 0;
    citizens.forEach(citizen => {
        if (citizen.gender == gender) {
            sum += 1;
        }
    });
    return sum;
}


//trả vể dữ liệu cho từng đối tượng tài khoản khác nhau.
exports.statisticalCitizens = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //check city account
        re1 = "^[0-9]{2}$"
        regex1 = new RegExp(re1, "g")

        //check district account
        re2 = "^[0-9]{4}$"
        regex2 = new RegExp(re2, "g")

        //check ward account
        re3 = "^[0-9]{6}$"
        regex3 = new RegExp(re3, "g")

        //check village account
        re4 = "^[0-9]{8}$"
        regex4 = new RegExp(re4, "g")

        //get citizens of city.
        if (user.username.match(regex1)) {
            Citizen.find({ city: user.city })
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    const age = caculateOld2(citizens)
                    const male = countGender(citizens, "Nữ")
                    const female = countGender(citizens, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }


        //get citizens of district
        else if (user.username.match(regex2)) {
            Citizen.find({ district: user.district })
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    const age = caculateOld2(citizens)
                    const male = countGender(citizens, "Nữ")
                    const female = countGender(citizens, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }
        //get citizens of ward
        else if (user.username.match(regex3)) {
            Citizen.find({ ward: user.ward })
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    const age = caculateOld2(citizens)
                    const male = countGender(citizens, "Nữ")
                    const female = countGender(citizens, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }

        //get citizens of village
        else if (user.username.match(regex4)) {
            Citizen.find({ village: user.village })
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    const age = caculateOld2(citizens)
                    const male = countGender(citizens, "Nữ")
                    const female = countGender(citizens, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }

        else {
            Citizen.find()
                .exec((err, citizens) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    const age = caculateOld2(citizens)
                    const male = countGender(citizens, "Nữ")
                    const female = countGender(citizens, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }

    })
}



//tìm kiếm cư dân theo một trường thông tin bất kì.
exports.searchCitizens = (req, res) => {
    if (req.body.citizenID) {
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

    else if (req, body.name) {
        Citizen.find({ name: req.body.name })
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

    else if (req.body.dateOfBirth) {
        Citizen.find({ dateOfBirth: req.body.dateOfBirth })
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

    else if (req.body.gender) {
        Citizen.find({ gender: req.body.gender })
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
}



//lọc

exports.searchAddress = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //check city account
        re1 = "^[0-9]{2}$"
        regex1 = new RegExp(re1, "g")

        //check district account
        re2 = "^[0-9]{4}$"
        regex2 = new RegExp(re2, "g")

        //check ward account
        re3 = "^[0-9]{6}$"
        regex3 = new RegExp(re3, "g")

        //get citizens of city.
        if (user.username.match(regex1)) {
            Citizen.find({ city: user.city })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.villageName && req.body.wardName && req.body.districtName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName
                                && citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.wardName && req.body.districtName) {
                        citizens.forEach(citizen => {
                            if (citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.districtName) {
                        citizens.forEach(citizen => {
                            if (citizen.district.districtName == req.body.districtName) {
                                list.push(citizen)
                            }
                        });
                    }
                    res.status(200).send(list);

                })
        }


        //get citizens of district
        else if (user.username.match(regex2)) {
            Citizen.find({ district: user.district })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.villageName && req.body.wardName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName
                                && citizen.ward.wardName == req.body.wardName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.wardName) {
                        citizens.forEach(citizen => {
                            if (citizen.ward.wardName == req.body.wardName) {
                                list.push(citizen)
                            }
                        });
                    }
                    res.status(200).send(list);
                })
        }

        //get citizens of ward
        else if (user.username.match(regex3)) {
            Citizen.find({ ward: user.ward })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.villageName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName) {
                                list.push(citizen)
                            }
                        });
                    }
                    res.status(200).send(list);
                })
        }

        //get all citizens
        else {
            Citizen.find()
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (req.body.villageName && req.body.wardName && req.body.districtName && req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName
                                && citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName
                                && citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.wardName && req.body.districtName && req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName
                                && citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.districtName && req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.district.districtName == req.body.districtName
                                && citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    res.status(200).send(list);
                })
        }

    })

}

exports.searchStatisticalCitizens = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //check city account
        re1 = "^[0-9]{2}$"
        regex1 = new RegExp(re1, "g")

        //check district account
        re2 = "^[0-9]{4}$"
        regex2 = new RegExp(re2, "g")

        //check ward account
        re3 = "^[0-9]{6}$"
        regex3 = new RegExp(re3, "g")

        //get citizens of city.
        if (user.username.match(regex1)) {
            Citizen.find({ city: user.city })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.villageName && req.body.wardName && req.body.districtName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName
                                && citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.wardName && req.body.districtName) {
                        citizens.forEach(citizen => {
                            if (citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.districtName) {
                        citizens.forEach(citizen => {
                            if (citizen.district.districtName == req.body.districtName) {
                                list.push(citizen)
                            }
                        });
                    }
                    //res.status(200).send(list);

                    const age = caculateOld2(list)
                    const male = countGender(list, "Nữ")
                    const female = countGender(list, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )

                })
        }


        //get citizens of district
        else if (user.username.match(regex2)) {
            Citizen.find({ district: user.district })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.villageName && req.body.wardName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName
                                && citizen.ward.wardName == req.body.wardName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.wardName) {
                        citizens.forEach(citizen => {
                            if (citizen.ward.wardName == req.body.wardName) {
                                list.push(citizen)
                            }
                        });
                    }
                    //res.status(200).send(list);
                    const age = caculateOld2(list)
                    const male = countGender(list, "Nữ")
                    const female = countGender(list, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }

        //get citizens of ward
        else if (user.username.match(regex3)) {
            Citizen.find({ ward: user.ward })
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.villageName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName) {
                                list.push(citizen)
                            }
                        });
                    }
                    //res.status(200).send(list);
                    const age = caculateOld2(list)
                    const male = countGender(list, "Nữ")
                    const female = countGender(list, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }

        //get all citizens
        else {
            Citizen.find()
                .populate("city", "cityName cityID")
                .populate("district", "districtName districtID")
                .populate("ward", "wardName wardID")
                .populate("village", "villageName villageID")
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (req.body.villageName && req.body.wardName && req.body.districtName && req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.village.villageName == req.body.villageName
                                && citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName
                                && citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.wardName && req.body.districtName && req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.ward.wardName == req.body.wardName
                                && citizen.district.districtName == req.body.districtName
                                && citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.districtName && req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.district.districtName == req.body.districtName
                                && citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    else if (req.body.cityName) {
                        citizens.forEach(citizen => {
                            if (citizen.city.cityName == req.body.cityName) {
                                list.push(citizen)
                            }
                        });
                    }
                    const age = caculateOld2(list)
                    const male = countGender(list, "Nữ")
                    const female = countGender(list, "Nam")
                    res.status(200).send(
                        {
                            "0-10": age.sum1,
                            "11-20": age.sum2,
                            "21-30": age.sum3,
                            "31-40": age.sum4,
                            "41-50": age.sum5,
                            "51-60": age.sum6,
                            "61-70": age.sum7,
                            "71-80": age.sum8,
                            "81-90": age.sum9,
                            "91-100": age.sum10,
                            ">100": age.sum11,
                            male: male,
                            female: female
                        }
                    )
                })
        }

    })

}
exports.statisticalCitizenByAddress = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //check city account
        re1 = "^[0-9]{2}$"
        regex1 = new RegExp(re1, "g")

        //check district account
        re2 = "^[0-9]{4}$"
        regex2 = new RegExp(re2, "g")

        //check ward account
        re3 = "^[0-9]{6}$"
        regex3 = new RegExp(re3, "g")

        Citizen.find().exec((err, citizens) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user.username.match(regex1)) {
                var list = []
                District.find({ city: user.city }).exec((err, districts) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    districts.forEach(district => {
                        var sum = 0
                        citizens.forEach(citizen => {
                            if (citizen.district.equals(district._id)) {
                                sum += 1;
                            }
                        });
                        list.push({
                            name: district.districtName,
                            population: sum
                        })
                    });

                    res.send(list)
                })

            }
            else if (user.username.match(regex2)) {
                var list = []
                Ward.find({ district: user.district }).exec((err, wards) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    wards.forEach(ward => {
                        var sum = 0
                        citizens.forEach(citizen => {
                            if (citizen.ward.equals(ward._id)) {
                                sum += 1;
                            }
                        });
                        list.push({
                            name: ward.wardName,
                            population: sum
                        })
                    });

                    res.send(list)
                })

            }
            else if (user.username.match(regex3)) {
                var list = []
                Village.find({ ward: user.ward }).exec((err, villages) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    villages.forEach(village => {
                        var sum = 0
                        citizens.forEach(citizen => {
                            if (citizen.village.equals(village._id)) {
                                sum += 1;
                            }
                        });
                        list.push({
                            name: village.villageName,
                            population: sum
                        })
                    });

                    res.send(list)
                })

            }
            else {
                var list = []
                City.find().exec((err, citis) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    citis.forEach(city => {
                        var sum = 0
                        citizens.forEach(citizen => {
                            if (citizen.city.equals(city._id)) {
                                sum += 1;
                            }
                        });
                        list.push({
                            name: city.cityName,
                            population: sum
                        })
                    });

                    res.send(list)
                })

            }

        })

    })
}


exports.searchStatisticalAddress = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //check city account
        re1 = "^[0-9]{2}$"
        regex1 = new RegExp(re1, "g")

        //check district account
        re2 = "^[0-9]{4}$"
        regex2 = new RegExp(re2, "g")

        //check ward account
        re3 = "^[0-9]{6}$"
        regex3 = new RegExp(re3, "g")

        //get citizens of city.
        if (user.username.match(regex1)) {
            Citizen.find({ city: user.city })
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (req.body.districtName && req.body.wardName) {
                       Ward.findOne({ wardName: req.body.wardName }).exec((err, ward) => {
                            Village.find({ ward: ward._id }).exec((err, villages) => {
                                if (err) {
                                    return;
                                }
                                villages.forEach(village => {
                                    var sum = 0
                                    citizens.forEach(citizen => {
                                        if (citizen.village.equals(village._id)) {
                                            sum += 1;
                                        }
                                    });
                                    list.push({
                                        name: village.villageName,
                                        population: sum
                                    })
                                });
                                console.log(list);

                                res.send(list)
                            })
                        })
                       
                    }
                    else if (req.body.districtName) {
                        District.findOne({ districtName: req.body.districtName }).exec((err, district) => {
                            Ward.find({ district: district._id }).exec((err, wards) => {
                                if (err) {
                                    return;
                                }
                                wards.forEach(ward => {
                                    var sum = 0
                                    citizens.forEach(citizen => {
                                        if (citizen.ward.equals(ward._id)) {
                                            sum += 1;
                                        }
                                    });
                                    list.push({
                                        name: ward.wardName,
                                        population: sum
                                    })
                                });
                                console.log(list);
                                res.send(list)
                            })
                        })

                    }
                })
        }


        //get citizens of district
        else if (user.username.match(regex2)) {
            Citizen.find({ district: user.district })
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    if (req.body.wardName) {
                        Ward.findOne({ wardName: req.body.wardName }).exec((err, ward) => {
                            Village.find({ ward: ward._id }).exec((err, villages) => {
                                if (err) {
                                    return;
                                }
                                villages.forEach(village => {
                                    var sum = 0
                                    citizens.forEach(citizen => {
                                        if (citizen.village.equals(village._id)) {
                                            sum += 1;
                                        }
                                    });
                                    list.push({
                                        name: village.villageName,
                                        population: sum
                                    })
                                });
                                console.log(list);

                                res.send(list)
                            })
                        })
                    }
                })
        }

        //get all citizens
        else {
            Citizen.find()
                .exec((err, citizens) => {
                    var list = []
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (req.body.wardName && req.body.districtName && req.body.cityName) {
                        Ward.findOne({ wardName: req.body.wardName }).exec((err, ward) => {
                            Village.find({ ward: ward._id }).exec((err, villages) => {
                                if (err) {
                                    return;
                                }
                                villages.forEach(village => {
                                    var sum = 0
                                    citizens.forEach(citizen => {
                                        if (citizen.village.equals(village._id)) {
                                            sum += 1;
                                        }
                                    });
                                    list.push({
                                        name: village.villageName,
                                        population: sum
                                    })
                                });
                                console.log(list);

                                res.send(list)
                            })
                        })
                    }
                    else if (req.body.districtName && req.body.cityName) {
                        District.findOne({ districtName: req.body.districtName }).exec((err, district) => {
                            Ward.find({ district: district._id }).exec((err, wards) => {
                                if (err) {
                                    return;
                                }
                                wards.forEach(ward => {
                                    var sum = 0
                                    citizens.forEach(citizen => {
                                        if (citizen.ward.equals(ward._id)) {
                                            sum += 1;
                                        }
                                    });
                                    list.push({
                                        name: ward.wardName,
                                        population: sum
                                    })
                                });
                                console.log(list);
                                res.send(list)
                            })
                        })
                    }
                    else if (req.body.cityName) {
                        City.findOne({cityName: req.body.cityName }).exec((err, city) => {
                            District.find({ city: city._id }).exec((err, districts) => {
                                if (err) {
                                    return;
                                }
                                districts.forEach(district => {
                                    var sum = 0
                                    citizens.forEach(citizen => {
                                        if (citizen.district.equals(district._id)) {
                                            sum += 1;
                                        }
                                    });
                                    list.push({
                                        name: district.districtName,
                                        population: sum
                                    })
                                });
                                console.log(list);
                                res.send(list)
                            })
                        })
                    }
                    
                })
        }

    })

}




