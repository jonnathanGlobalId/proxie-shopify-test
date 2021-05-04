const crypto = require('crypto');
const queryString = require('query-string');
const checkHmacValidity = require('shopify-hmac-validation').checkHmacValidity;

exports.checkHmac = (req, res, next) => {
  const hmacQuery = req.body.hmac;
  const check = checkHmacValidity(process.env.SECRET_API_KEY, hmacQuery);

  console.log(check);
  next();
}                  