const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/A1", [
    verifySignUp.checkDuplicateUsername,
    verifySignUp.checkRolesExisted],
    controller.signupA1
  )


  //A1 sau khi đăng nhập thành công thì có thể cấp tài khoản cho A2
  app.post("/A2",
    [
      authJwt.verifyToken, authJwt.isA1,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
    ],
    controller.signupA2
  );



  app.get(
    "/A2",
    [authJwt.verifyToken, authJwt.isA1],
    userController.getA2
  );


  //A2 sau khi đăng nhập thành công thì có thể cấp tài khoản cho A3
  app.post("/A3",
    [
      authJwt.verifyToken, authJwt.isA2,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      authJwt.checkTime2Work
    ],
    controller.signupA3
  );

  

  app.get("/A3",
  [authJwt.verifyToken, authJwt.isA2],
  userController.getA3
);

  //A3 sau khi đăng nhập thành công thì có thể cấp tài khoản cho B1
  app.post("/B1",
    [
      //xác nhận đăng nhập
      authJwt.verifyToken,
      //xác nhận là A3
      authJwt.isA3,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      authJwt.checkTime2Work
    ],
    controller.signupB1
  );

  

  app.get("/B1",
  [authJwt.verifyToken, authJwt.isA3],
  userController.getB1
);


  //B1 sau khi đăng nhập thành công thì có thể cấp tài khoản cho B2
  app.post("/B2",
    [
      authJwt.verifyToken, authJwt.isB1,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      authJwt.checkTime2Work
    ],
    controller.signupB2
  );


  app.get("/B2",
  [authJwt.verifyToken, authJwt.isB1],
  userController.getB2
);



  //signin 
app.post("/signin", controller.signin);
};
