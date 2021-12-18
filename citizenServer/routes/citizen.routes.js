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

    //lay danh sach citizen cu 1 thanh pho
    app.get("/citizensOfCity", [authJwt.verifyToken, authJwt.isA2], citizenController.getCitizensOfCity)
    
    //lay danh sach cu dan cua 1 huyen/quan
    app.get('/citizensOfDistrict', [authJwt.verifyToken, authJwt.isA3], citizenController.getCitizensOfDistrict)
    
    //lay danh sach cu dan cua 1 xa/phuong
    app.get("/citizensOfWard", [authJwt.verifyToken, authJwt.isB1], citizenController.getCitizensOfWard)
    
    //lay danh sach cu dan cua 1 lang
    app.get("/citizensOfVillage", [authJwt.verifyToken, authJwt.isB2], citizenController.getCitizensOfVillage)
}