const Comment = require("../models/Comment");
const Post = require("../models/Post");
const mongoose = require("mongoose");

exports.createComment = async (req, res, next) => {
    try {
        console.log("Recibiendo comentario con POST")
        console.log("Body:", req.body)
        console.log("Params:", req.params)
        const { content } = req.body;
        const postId = req.params.postId;

        const comment = new Comment({
            content,
            createdBy: req.user.id,
            post: postId
        });

        await comment.save();

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
        });

        res.status(201).json(comment);
    } catch (err) {
        next(err);
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .populate("createdBy", "username") 
            .sort({ createdAt: -1 }); // más recientes

        res.json(comments);
    } catch (err) {
        next(`Error en controlador GET Comment: ${err}`);
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Contenido requerido" });
        }

        const comment = await Comment.findOne({ _id: commentId, post: postId });

        if (!comment) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }

        if (comment.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ error: "No autorizado para editar este comentario" });
        }

        comment.content = content;
        await comment.save();

        res.json({ message: "Comentario actualizado", comment });
    } catch (err) {
        next(err);
    }
};

exports.deleteComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;

        const comment = await Comment.findOne({ _id: commentId, post: postId });
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });

        if (comment.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ error: "No autorizado para eliminar este comentario" });
        }

        await Comment.deleteOne({ _id: commentId });

        await Post.findByIdAndUpdate(postId, {
            $pull: { comments: commentId }
        });

        res.json({ message: "Comentario eliminado" });
    } catch (err) {
        next(err);
    }
};