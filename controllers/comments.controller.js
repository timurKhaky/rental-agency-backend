const { findByIdAndRemove } = require("../models/Comment.model");
const Comment = require("../models/Comment.model");

module.exports.commentsController = {
    getComments: async (req, res) => {
        try {
            const comments = await Comment.find().populate('userId reviewToPost')
            res.json(comments)
        } catch (error) {
            res.json(error.message)
        }
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.findByIdAndRemove(req.params.id)
            res.json("комментарий удален")

        } catch (error) {
            res.json(error.message)
            
        }
    },
    addComment: async (req, res) => {
        const { text, userId, reviewToPost } = req.body

        try {
            await Comment.create({
                text, userId, reviewToPost
            })
            res.json("комментарий добавлен")
        } catch (error) {
            res.json(error.message)
        }
    }

};