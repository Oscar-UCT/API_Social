const Post = require("../models/Post");
const mongoose = require("mongoose");

exports.createPost = async (req, res, next) => {
    try {
        console.log("Recibiendo POST request")
        const { content } = req.body;
        const post = new Post({
            content,
            createdBy: req.user.id
        });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        next(`Error en controlador: ${err}`);
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        console.log("Recibiendo GET request")
        const posts = await Post.find()
            .populate({
                path: "comments",
                populate: { path: "createdBy", select: "username" }
            })
            .populate("createdBy", "username");
        res.status(201).json(posts);
    } catch (err) {
        next(`Error en controlador: ${err}`);
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        console.log("Recibiendo GET request #2")

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const post = await Post.findById(id)
            .populate({
                path: "comments",
                select: "content createdBy",
                populate: { path: "createdBy", select: "username" }
            })
            .populate("createdBy", "username"); // autor


        if (!post) return res.status(404).json({ error: "Post no encontrado" });

        res.status(201).json(post);
    } catch (err) {
        next(`Error en controlador: ${err}`);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        console.log("Recibiendo PUT request")

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const post = await Post.findByIdAndUpdate(id, req.body, { new: true })
            .populate({
                path: "comments",
                populate: { path: "createdBy", select: "username" }
            })
            .populate("createdBy", "username");

        if (!post) return res.status(404).json({ error: "Post no encontrado" });

        res.json(post);
    } catch (err) {
        next(`Error en controlador UpdatePost: ${err}`);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        console.log("Recibiendo DELETE request")

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const post = await Post.findByIdAndDelete(id)
        if (!post) return res.status(404).json({ error: "Post no encontrado" });

        res.json({ message: "Post eliminado" });
    } catch (err) {
        next(`Error en controlador: ${err}`);
    }
}