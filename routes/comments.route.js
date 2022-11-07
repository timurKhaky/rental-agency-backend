const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");

const router = Router();

router.post('/:id',commentsController.addComment)
router.delete('/:id',commentsController.deleteComment)
router.get('/',commentsController.getComments)

module.exports = router;
