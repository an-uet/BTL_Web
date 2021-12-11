const { authJwt } = require("../middlewares");
const checkDistrict = require("../middlewares/checkDistrict");
const districtController = require("../controllers/district.controller")

//routes
module.exports = function (app) {

    //cấp mã.
    app.post("/district",
        [
            authJwt.verifyToken, authJwt.isA2,
            checkDistrict.checkDuplicateDistrictID,
            checkDistrict.checkDuplicateDistrict
        ],
        districtController.postDistrict
    );

    //xóa mã: truyền vào disctrictID.. xuw lis them khi xao ma thi xoa tai khoan khong.
    app.delete("/district",
        [authJwt.verifyToken, authJwt.isA2, checkDistrict.checkDistrictExistedByDistrictID],
        districtController.deleteDistrict
    )

    app.put("/district", 
    [authJwt.verifyToken, authJwt.isA2, checkDistrict.checkDistrictExisted, checkDistrict.checkDuplicateDistrictID],
    districtController.putDistrict
    )
}