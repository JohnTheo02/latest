const express = require('express');
const controller = require('../controllers/form2-controller');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', controller.goToForm2);
router.post('/submit/:id', controller.submitEvent); // Χρησιμοποιώντας post για την υποβολή της φόρμας

module.exports = router;
