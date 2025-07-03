const express = require("express");
const router = express.Router();
const
    {
        createPost,
        getPosts,
        getPostById,
        updatePost,
        deletePost
    } = require("../controllers/postController");
const validate = require("../middleware/validate")
const auth = require("../middleware/auth");
const { postSchema } = require("../validators/postValidator");
const commentRoutes = require("./commentRoutes");

router.use(auth);

// Comment route
router.use("/:postId/comments", commentRoutes);

router.post("/", validate(postSchema), createPost);
router.get("/", validate(postSchema), getPosts);
router.get("/:id", getPostById);
router.put("/:id", validate(postSchema), updatePost);
router.delete("/:id", deletePost);

module.exports = router;