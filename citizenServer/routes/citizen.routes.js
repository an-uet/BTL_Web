const db = require("../models");
const { authJwt } = require("../middlewares");
const {checkCitizen} = require("../middlewares");
const citizenController = require("../controllers/citizen.controller")

module.exports = function (app) {

    // B2 khai bao citizen
    app.post("/citizenB2",
        [
            authJwt.verifyToken, authJwt.isB2,
            checkCitizen.checkDuplicateCitizenID
        ],
        citizenController.postCitizenForB2

    );
    //B1 khai bao citizen
    app.post("/citizenB1",
    [
        authJwt.verifyToken, authJwt.isB1,
        checkCitizen.checkDuplicateCitizenID
    ],
    citizenController.postCitizenForB1

);

    //xóa mã: truyền vào citizenID
    app.delete("/citizen",
        [authJwt.verifyToken, authJwt.isB2, checkCitizen.checkCitizenExisted],
        citizenController.deleteCitizen

    )

    //lay danh sach cu dan ca nuoc.
    app.get("/allCitizens",[authJwt.verifyToken, authJwt.isA1], citizenController.getAllCitizens)

    //lay danh sach citizens
    app.get("/citizens", [authJwt.verifyToken], citizenController.getCitizens)
    

    app.get("/caculateOld", citizenController.caculationOld)
    
}