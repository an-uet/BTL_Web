const { authJwt, checkWard } = require("../middlewares");
const wardController = require("../controllers/ward.controller")
const userController = require("../controllers/user.controller")
module.exports = function (app) {

    //cấp mã.
    app.post("/ward",
        [
            authJwt.verifyToken, authJwt.isA3,
            checkWard.checkDuplicateWard,
            checkWard.checkDuplicateWardID
        ],
        wardController.postWard

    );

    //xóa mã: truyền vào wardID.// xu li khi xoa ma thi xoas tai khoan hay khong?
    app.delete("/ward",
        [authJwt.verifyToken, authJwt.isA3, checkWard.checkWardExistedByWardID],
        wardController.deleteWard

    )
    app.put("/ward",
        [authJwt.verifyToken, authJwt.isA3, checkWard.checkWardExisted, checkWard.checkDuplicateWardID],
        wardController.putWard
    )

    app.post("/completeTheWork", [authJwt.verifyToken, authJwt.isB1], userController.completeTheWork)



}