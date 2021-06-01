const express = require('express');
const router = express.Router();
const {getSettingsOwner, changeSettings, createOwner} = require('../controllers/settings_controller');
const {getQuery} = require('../controllers/shopifyAccess');
const {getauthInfo, sendAuthInfo} = require('../controllers/auth_controller');
const {checkHmac} = require('../middlewares/verifyHmac');

const {createOrder, getAllOrders, acceptOrder, rejectOrder} = require('../controllers/order_controller');

router.get('/shopify-access', getQuery);

//Access token de usuario
router.post('/user-auth', sendAuthInfo);
router.get('/user-auth', getauthInfo);

//Rutas para ordenes
router.post('/create-order', createOrder);
router.get('/orders/:id', getAllOrders);
router.post('/order/acept', acceptOrder);
router.post('/order/reject', rejectOrder);

//Ruta para el owner y cambiar los settings
router.post('/create-owner', createOwner);
router.get('/user-settings-owner/:id', getSettingsOwner);
router.put('/change-user-settings-owner', changeSettings);

module.exports = router;