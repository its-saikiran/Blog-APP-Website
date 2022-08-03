const router = require('express').Router();

const {
    getAllBlogs
} = require('../controllers/blog.controller')

router.get('/all', getAllBlogs);
// router.get('/target/:id', targetBlog);

module.exports = router;