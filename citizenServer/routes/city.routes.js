const { authJwt } = require("../middlewares");
const checkCity = require("../middlewares/checkCity")
const cityController = require("../controllers/city.controller");
const { checkDuplicateCityID } = require("../middlewares/checkCity");

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

    //xóa mã: truyền vào _id.
    app.delete("/city",
        [
            authJwt.verifyToken, 
            authJwt.isA1, 
            checkCity.checkCityExistedByCityID
        ],
        cityController.deleteCity
    )

    //sửa: 

    app.put("/city",
        [
            authJwt.verifyToken, 
            authJwt.isA1, 
            checkCity.checkDuplicateCityID,
            checkCity.checkCityExisted,
           
        ],
        cityController.putCity
    )
}
