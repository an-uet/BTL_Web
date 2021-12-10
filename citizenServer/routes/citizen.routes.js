const db = require("../models");
const { authJwt } = require("../middlewares");
const checkCitizen = require("../middlewares/checkCitizen");
const citizenController = require("../controllers/citizen.controller")

module.exports = function (app) {

    //cấp mã.
    app.post("/citizen",
        [
            authJwt.verifyToken, authJwt.isB2,
            checkCitizen.checkDuplicateCitizenID
        ],
        citizenController.postCitizen

    );

    //xóa mã: truyền vào citizenID
    app.delete("/citizen",
        [authJwt.verifyToken, authJwt.isB2, checkCitizen.checkCitizenExisted],
        citizenController.deleteCitizen

    )


    //chưa set quyền.
    app.get("/citizen",[authJwt.verifyToken], citizenController.getCitizen)





}