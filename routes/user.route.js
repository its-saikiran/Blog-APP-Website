const router = require('express').Router();

const multer = require('../fileUploader/multer');


const {
    register,
    verifyOtp,
    login,
    update,
    logout,
    remove
} = require('../controllers/user.controller')

const isValidEmailPassword = require('../middlewares/isValidEmailPassword');
const isAccountExists = require('../middlewares/isAccountExists');
const isUserExist = require('../middlewares/isUserExist')

const { verifyToken, isUserLoggedIn } = require('../auth/jwt');

router.post('/register', isValidEmailPassword, isAccountExists, register);
router.post('/otp', isValidEmailPassword, isUserExist, verifyOtp);
router.post('/login', isValidEmailPassword, isUserExist, login);
router.patch('/update', verifyToken, update);
router.delete('/logout', verifyToken, logout);
router.delete('/remove', verifyToken, remove);


const {
    createBlog,
    editBlog,
    comment,
    like_dislike,
    deleteBlog,
    getAllBlogs
} = require('../controllers/blog.controller');


router.get('/blog/all', isUserLoggedIn, getAllBlogs)
router.post('/create', verifyToken, createBlog);
// router.post('/create', verifyToken, multer.single('image'), createBlog);
router.patch('/edit', verifyToken, editBlog);
router.post('/comment', verifyToken, comment);
router.post('/reaction/:blogId', verifyToken, like_dislike);
router.delete('/delete', verifyToken, deleteBlog);


module.exports = router;  