const express = require('express');
const router = express.Router();
const {getSettings, changeSettings} = require('../controllers/settings_controller');
const {getQuery} = require('../controllers/shopifyAccess');

router.get('/shopify-access', getQuery);
router.get('/user-settings', getSettings);
router.post('/user-settings', changeSettings);

module.exports = router;