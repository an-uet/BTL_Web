const { authJwt } = require("../middlewares");
const checkCity = require("../middlewares/checkCity")
const cityController = require("../controllers/city.controller")

//routes
module.exports = function (app) {

    //cấp mã.
    app.post("/city",
        [
            authJwt.verifyToken, authJwt.isA1,
            checkCity.checkDuplicateCity,
            checkCity.checkDuplicateCityID
        ],
        cityController.postCity

    );

    //xóa mã: truyền vào cityID.
    app.delete("/city",
        [
            authJwt.verifyToken, 
            authJwt.isA1, 
            checkCity.checkCityExisted
        ],
        cityController.deleteCity
    )

    //sửa: 

    app.put("/city",
        [
            authJwt.verifyToken, 
            authJwt.isA2, 
            checkCity.checkCityExisted
        ],
        cityController.putCity
    )
}
