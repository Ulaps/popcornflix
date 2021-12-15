const express = require('express');
const router = express.Router();

const {
    getAllUser,
    getUserDetail,
    createUser,
    userLogin,
    userLogout,
    googleAuth

} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/users').get(isAuthenticatedUser, getAllUser);
router.route('/userdetail/:id').get(isAuthenticatedUser, getUserDetail);
router.route('/register').post(createUser);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);
router.route('/googlelogin').post(googleAuth);

module.exports = router;