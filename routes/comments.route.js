const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");

const router = Router();
router.post('/',commentsController.addComment)
router.get('/',commentsController.getComments)
router.delete('/:id',commentsController.deleteComment)

module.exports = router;
