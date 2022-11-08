const { Router } = require("express");
const {
  immovablesController,
} = require("../controllers/immovables.controller");
const authMiddleware = require("./middlewares/auth.middleware");
const fileMiddleware = require("./middlewares/images.upload");

const router = Router();

router.post("/", immovablesController.postImmovables);
router.patch(
  "/:id",
  fileMiddleware.single("img"),
  immovablesController.patchImmovables
);
router.put("/", immovablesController.getImmovables);
router.get("/:id", immovablesController.getImmovablesId);
router.get(
  "/user/favorites",
  authMiddleware,
  immovablesController.getUserFavorites
);
router.delete("user/:id", immovablesController.deleteImmovablesId);

module.exports = router;
