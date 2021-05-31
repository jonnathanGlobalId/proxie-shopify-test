const express = require('express');
const router = express.Router();
const {getSettingsOwner, changeSettings, createOwner} = require('../controllers/settings_controller');
const {getQuery} = require('../controllers/shopifyAccess');
const {getauthInfo, sendAuthInfo} = require('../controllers/auth_controller');
const {checkHmac} = require('../middlewares/verifyHmac');

const {createOrder, getAllOrders} = require('../controllers/order_controller');

router.get('/shopify-access', getQuery);
router.get('/user-settings-owner/:id', getSettingsOwner);
router.put('/change-user-settings-owner', changeSettings);

//Access token de usuario
router.post('/user-auth', sendAuthInfo);
router.get('/user-auth', getauthInfo);

//Rutas para ordenes
router.post('/create-order', createOrder);
router.get('/orders/:id', getAllOrders);

//Ruta para el owner
router.post('/create-owner', createOwner)

module.exports = router;