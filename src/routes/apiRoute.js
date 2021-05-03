const express = require('express');
const router = express.Router();
const {getSettings, changeSettings} = require('../controllers/settings_controller');
const {getQuery} = require('../controllers/shopifyAccess');
const {getauthInfo, sendAuthInfo} = require('../controllers/auth_controller');

router.get('/shopify-access', getQuery);
router.get('/user-settings', getSettings);
router.post('/user-settings', changeSettings);

//Access token de usuario
router.post('/user-auth', sendAuthInfo);
router.get('/user-auth', getauthInfo);

module.exports = router;