const { Router } = require("express");
const { offersController } = require("../controllers/offers.controller");
const middleware = require("./middlewares/auth.middleware");

const router = Router();
router.post("/:id", middleware, offersController.addOffer);
router.get("/", middleware, offersController.getOffers);
router.patch("/:id", middleware, offersController.confirmOffer);
router.delete("/:id", middleware, offersController.deleteOffer);
router.get("/all", offersController.getAllOffers);
router.get("/last/:id", offersController.getLastOffer);

module.exports = router;
