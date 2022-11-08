const { findByIdAndRemove } = require("../models/Comment.model");
const Comment = require("../models/Comment.model");

module.exports.commentsController = {
    getComments: async (req, res) => {
        try {
            const comments = await Comment.find().populate({path: 'userId',select : 'type'}).populate('reviewToPost')

            res.json(comments)
        } catch (error) {
            res.json({error: error.message})
        }
    },
    deleteComment: async (req, res) => {
        try {
            await findByIdAndRemove(req.params.id)

            res.json("комментарий удален")

        } catch (error) {
            res.json(error.message)
            
        }
    },
    addComment: async (req, res) => {
        const { text, userId, stars } = req.body

        try {
           const comment =  await Comment.create({
                text, userId: req.user, reviewToPost: req.params.id, stars
            })

            return res.json(comment)
        } catch (error) {
            return res.json(error.message)
        }
    }
};

