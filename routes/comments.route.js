const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");
const middleware = require("./middlewares/auth.middleware");

const router = Router();
router.post("/:id", middleware, commentsController.addComment);
router.get("/", commentsController.getComments);

router.delete("/:id", commentsController.deleteComment);

module.exports = router;
