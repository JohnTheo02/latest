const passport = require('passport');
const express = require('express');
const controller = require('../controllers/login-controller');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', controller.goToAuthenticationPage);
router.post('/user', controller.checkAuthenticated, controller.signIn);
router.post('/register', controller.checkAuthenticated, controller.signUp);

module.exports = router;    