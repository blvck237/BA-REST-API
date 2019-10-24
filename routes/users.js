const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', userController.create);

router.post('/login', userController.login);

router.post('/logout', auth, userController.logout);

router.post('/logoutall', auth, userController.logoutall);

module.exports = router;
