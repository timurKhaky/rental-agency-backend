const { Router } = require("express");
const {
  immovablesController,
} = require("../controllers/immovables.controller");
const fileMiddleware = require("./middlewares/images.upload");
// const middleware = require("./middlewares/auth.middleware");
const router = Router();

router.post(
  "/",
  immovablesController.postImmovables
);
router.patch(
  "/:id",
  fileMiddleware.single("img"),
  immovablesController.patchImmovables
);
router.put("/", immovablesController.getImmovables);
router.get("/user/:id", immovablesController.getImmovablesId);
router.delete("user/:id", immovablesController.deleteImmovablesId);

module.exports = router;
