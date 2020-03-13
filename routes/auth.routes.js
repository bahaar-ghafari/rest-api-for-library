const router = require('express').Router();
const controller = require('../controllers/auth.controllers');
router.post('/login', controller.login);
module.exports = router;
