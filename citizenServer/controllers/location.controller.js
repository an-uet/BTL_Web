const db = require("../models");
const City = db.city;
const District = db.district;
const Ward = db.ward;
const Village = db.village;
const User = db.user


//xoa het huyện/ quận liên quan
function deleteDistricts(regax){
  District.deleteMany({ districtID: regax })
  .exec((err, districts) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all districts were created");

  })
}

//xoa het xa/phuong lien quan
function deleteWards(regax){
  Ward.deleteMany({ wardID: regax })
  .exec((err, wards) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all wards were created");

  })
}

//xoa het lang lien quan

function deleteVillages(regax){
  Village.deleteMany({ villageID: regax })
  .exec((err, villages) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log("delete all villages were created");

  })
}

function deleteUsers(regax) {
  User.deleteMany({ username: regax })
    .exec((err, users) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log("delete all user were created");

    })
  return;
}

//xoa het citizen lien quan

const locationController = {
  deleteDistricts,
  deleteVillages, deleteWards,
  deleteUsers
 
};

module.exports = locationController;


