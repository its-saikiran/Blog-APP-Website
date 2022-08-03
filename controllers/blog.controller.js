const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cloudinary = require('../fileUploader/cloudinary');
const path = require('path')


const getAllBlogs = async (req, res) => {
    console.log(`---> get all blogs section!`)
    // console.log(req.body)
    const { userId } = req.body;
    try {
        const data = await prisma.blog.findMany({
            include: { user: true },
            orderBy: { blogId: 'desc' }
        })
        res.status(200).json({ data: data, userId })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};


const createBlog = async (req, res) => {
    console.log('---> create blog section!')
    // const img = await cloudinary.uploader.upload(req.file.path);
    // const image = img.secure_url;
    // req.body = { ...req.body, image }
    try {
        await prisma.blog.create({
            data: req.body
        })
        res.status(201).json({
            msg: 'Blog created successfully.'
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};


const editBlog = async (req, res) => {
    try {
        await prisma.blog.update({
            data: req.body
        })
        res.status(201).json({
            msg: 'Edited successfully.'
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
};


const comment = async (req, res) => {
    try {
        await prisma.blog.update({
            data: req.body
        })
        res.status(201).json({
            msg: 'successful.'
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
};


const like_dislike = async (req, res) => {
    console.log(`---> like, dislike section!`)
    const blogId = parseInt(req.params.blogId);
    const userId = parseInt(req.body.userId);
    // console.log(req.body)
    const userReaction = req.body;
    try {
        const result = await prisma.blog.findUnique({
            where: { blogId }
        })
        if (result) {
            let parsedReaction = result.reactions;
            let likes = result.likes;
            let dislikes = result.dislikes;
            if (parsedReaction.length === 0) {
                parsedReaction = {}
                if (userReaction.likes) {
                    likes = likes + 1;
                    parsedReaction.liked = [userId]
                    parsedReaction.disliked = []
                } else if (userReaction.dislikes) {
                    dislikes = dislikes + 1;
                    parsedReaction.liked = []
                    parsedReaction.disliked = [userId]
                }
            } else {
                parsedReaction = JSON.parse(result.reactions[0]);
                if (userReaction.hasOwnProperty('likes') && userReaction.likes) {
                    if (parsedReaction.liked.includes(userId)) {
                        likes = likes - 1;
                        let isReacted = parsedReaction.liked.indexOf(userId)
                        if (isReacted >= 0) {
                            parsedReaction.liked.splice(isReacted, 1)
                        }
                    } else {
                        likes = likes + 1;
                        parsedReaction.liked.push(userId)
                        let isReacted = parsedReaction.disliked.indexOf(userId)
                        if (isReacted >= 0) {
                            dislikes = dislikes - 1;
                            parsedReaction.disliked.splice(isReacted, 1)
                        }
                    }
                } else if (userReaction.hasOwnProperty('dislikes') && userReaction.dislikes) {
                    if (parsedReaction.disliked.includes(userId)) {
                        dislikes = dislikes - 1;
                        let isReacted = parsedReaction.disliked.indexOf(userId)
                        if (isReacted >= 0) {
                            parsedReaction.disliked.splice(isReacted, 1)
                        }
                    } else {
                        dislikes = dislikes + 1;
                        parsedReaction.disliked.push(userId)
                        let isReacted = parsedReaction.liked.indexOf(userId)
                        if (isReacted >= 0) {
                            likes = likes - 1;
                            parsedReaction.liked.splice(isReacted, 1)
                        }
                    }
                }
            }


            await prisma.blog.update({
                where: { blogId },
                data: {
                    likes,
                    dislikes,
                    reactions: JSON.stringify(parsedReaction)
                }
            })
            return res.status(200).json({ msg: 'Reaction successful.' })
        };

        res.status(400).json({ Error: 'Blog not found.' })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: 'Internal server error.'
        })
    }
};



const deleteBlog = async (req, res) => {
    try {
        await prisma.blog.delete({
            data: { id }
        })
        res.status(201).json({
            msg: 'Blogt deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
};



module.exports = {
    getAllBlogs,
    createBlog,
    editBlog,
    comment,
    like_dislike,
    deleteBlog,
}