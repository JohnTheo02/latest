const express = require('express');
const req = require('express/lib/request');
const homeController = require('../controllers/home-controller.js');

const router = express.Router();


const loginRouter = require('./login.js');
const locationselectionRouter = require('./location.js');
const schoolRouter = require('./school.js');
const form1Router = require('./form1.js');
const form2Router = require('./form2.js');
const mapRouter = require('./map.js');
const profileRouter = require('./profile.js');
const compformsRouter = require('./completed_forms.js');
const incompformsRouter = require('./incompleted_forms.js');

router.use((req, res, next) => {
    next();
});

//Rest Routers
router.use('/login', loginRouter);
router.use('/location', locationselectionRouter);
router.use('/school', schoolRouter);
router.use('/form1', form1Router);
router.use('/form2', form2Router);
router.use('/map', mapRouter);
router.use('/profile', profileRouter);
router.use('/completed_forms', compformsRouter);
router.use('/incompleted_forms', incompformsRouter);

//Home page router
router.get('/', homeController.getHomePage);


router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

module.exports = router;