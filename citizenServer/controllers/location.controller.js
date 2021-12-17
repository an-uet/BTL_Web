const { district } = require("../models");
const db = require("../models");
const City = db.city;
const District = db.district;
const Ward = db.ward;
const Village = db.village;
const User = db.user


//xoa het huyện/ quận liên quan
function deleteDistricts(regex){
  District.deleteMany({ districtID: regex })
  .exec((err, districts) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all districts were created");

  })
}

//xoa het xa/phuong lien quan
function deleteWards(regex){
  Ward.deleteMany({ wardID: regex })
  .exec((err, wards) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all wards were created");

  })
}

//xoa het lang lien quan

function deleteVillages(regex){
  Village.deleteMany({ villageID: regex })
  .exec((err, villages) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all villages were created");

  })
}

//sua het district lien quan khi nguoi dung sua cityID
function putDistricts(regex, ID) {
  District.find({districtID: regex})
  .exec((err, districts) => {
    if (err) {
      console.log(err)
      return;
    }
    districts.forEach(district => {
      var oldID = district.districtID
      var newID = oldID.replace(regex,ID)
      console.log(newID)
      district.districtID = newID
      district.save(err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("cap nhat districtID thanh cong")
      });
    });
  })
}


//sua het ward lien quan khi nguoi dung sua cityID/districtID
function putWards(regex, ID) {
  Ward.find({wardID: regex})
  .exec((err, wards) => {
    if (err) {
      console.log(err)
      return;
    }
    wards.forEach(ward => {
      var oldID = ward.wardID
      var newID = oldID.replace(regex,ID)
      console.log(newID)
      ward.wardID = newID
      ward.save(err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("cap nhat wardID thanh cong")
      });

    });
  })
}

//sua het village lien quan khi nguoi dung sua cityID/districtID 
function putVillages(regex, ID) {
  Village.find({villageID: regex})
  .exec((err, villages) => {
    if (err) {
      console.log(err)
      return;
    }
    villages.forEach(village => {
      var oldID = village.villageID
      var newID = oldID.replace(regex, ID)
      console.log(newID)
      village.villageID = newID
      village.save(err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("cap nhat villageID thanh cong")
      });

    });
  })
}

getAllLocation = (req, res) => {
  var list = []
  City.find().exec((err,citis) => {
    citis.forEach(city => {
      var oneCity = []
      District.find().exec((er, districts) => {
        districts.forEach(district => {
          if(district.city = city._id){
            oneCity.push(district);
          }
        });
      })
      list.push(oneCity)
    });

  })
}

const locationController = {
  deleteDistricts,
  deleteVillages, 
  deleteWards,
  putDistricts, 
  putWards,
  putVillages
 
};

module.exports = locationController;


