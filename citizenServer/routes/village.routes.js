
const { authJwt } = require("../middlewares");
const checkVillage = require("../middlewares/checkVillage");
const villageController = require("../controllers/village.controller")

module.exports = function (app) {

    //cấp mã.
    app.post("/village",
        [
            authJwt.verifyToken, authJwt.isB1,
            checkVillage.checkDuplicateVillage,
            checkVillage.checkDuplicateVillageID
        ],
        villageController.postVillage

    );


    //xóa mã: truyền vào villageID.
    app.delete("/village",
        [authJwt.verifyToken, authJwt.isB1, checkVillage.checkVillageExistedByVillageID],
       villageController.deleteVillage
    )

    app.put("/village", 
    [authJwt.verifyToken, authJwt.isB1, checkVillage.checkVillageExisted, checkVillage.checkDuplicateVillageID],
    villageController.putVillage
    )

}