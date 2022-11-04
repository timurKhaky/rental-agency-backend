const { Router } = require("express");
const { usersController } = require("../controllers/users.contoller");

const router = Router();
router.post("/signup", usersController.signUp);
router.post("/signin", usersController.signIn);

module.exports = router;
