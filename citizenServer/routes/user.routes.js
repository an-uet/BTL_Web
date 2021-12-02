const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
const controller = require("../controllers/auth.controller");
const { verifySignUp } = require("../middlewares");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userController.userBoard);

  app.get(
    "/api/test/A1",
    [authJwt.verifyToken, authJwt.isA1],
    userController.moderatorBoard
  );

  app.get("/api/test/A1",
    [authJwt.verifyToken, authJwt.isA1],
    userController.adminBoard
  );


  //A1 sau khi đăng nhập thành công thì có thể cấp tài khoản cho A2
  app.post("/create/A2",
    [
      authJwt.verifyToken, authJwt.isA1,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signupA2
  );

  
  //A2 sau khi đăng nhập thành công thì có thể cấp tài khoản cho A3
  app.post("/create/A3",
    [
      authJwt.verifyToken, authJwt.isA2,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signupA3
  );

  
  //A3 sau khi đăng nhập thành công thì có thể cấp tài khoản cho B1
  app.post("/create/B1",
    [
      //xác nhận đăng nhập
      authJwt.verifyToken, 
      //xác nhận là A3
      authJwt.isA3,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signupB1
  );

  
  //B1 sau khi đăng nhập thành công thì có thể cấp tài khoản cho B2
  app.post("/create/B2",
    [
      authJwt.verifyToken, authJwt.isB1,
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signupB2
  );



  //signin 
  app.post("/signin", controller.signin);
};
