const express = require("express");
const router = express.Router({ mergeParams: true });
const { createComment, getComments, updateComment, deleteComment} = require("../controllers/commentController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { commentSchema } = require("../validators/commentValidator");

router.use(auth);

router.post("/", validate(commentSchema), createComment);
router.get("/", getComments);
router.put("/:commentId", validate(commentSchema), updateComment);
router.delete("/:commentId", deleteComment);

module.exports = router;
