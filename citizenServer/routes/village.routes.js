
const { authJwt, checkVillage, verifySignUp } = require("../middlewares");
const villageController = require("../controllers/village.controller")

module.exports = function (app) {

    //cấp mã.
    app.post("/village",
        [
            authJwt.verifyToken,
            authJwt.isB1,
            authJwt.checkTime2Work,
            checkVillage.checkDuplicateVillage,
            checkVillage.checkDuplicateVillageID,
            checkVillage.checkValidVillageID
        ],
        villageController.postVillage

    );


    //xóa mã: truyền vào villageID.
    app.delete("/village",
        [authJwt.verifyToken,
        authJwt.isB1,
        authJwt.checkTime2Work,
        checkVillage.checkVillageExistedByVillageID
        ],
        villageController.deleteVillage
    )

    app.put("/village",
        [
            authJwt.verifyToken,
            authJwt.isB1,
            authJwt.checkTime2Work,
            checkVillage.checkVillageExisted,
            checkVillage.checkDuplicateVillageID,
            verifySignUp.checkValidpassword,
            checkVillage.checkValidVillageID
        ],
        villageController.putVillage
    )

}