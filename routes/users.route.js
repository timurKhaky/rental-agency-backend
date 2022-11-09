const { Router } = require("express");
const { usersController } = require("../controllers/users.contoller");
const middleware = require("./middlewares/auth.middleware");

const router = Router();
router.get("/info", middleware, usersController.getInfo);
router.patch("/order", middleware, usersController.addOrder);
router.patch("/order/delete", middleware, usersController.removeOrder);
router.post("/signup", usersController.signUp);
router.post("/signin", usersController.signIn);
router.patch("/favorites", middleware, usersController.addFavorite);

module.exports = router;
