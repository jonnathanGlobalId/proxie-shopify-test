const head = document.getElementsByTagName("head")[0]

const scriptJquery = document.createElement("script");
scriptJquery.src = "https://code.jquery.com/jquery-3.4.1.min.js";
scriptJquery.type = "text/javascript";

const scriptMoment = document.createElement("script");
scriptMoment.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js";
scriptMoment.type = 'text/javascript';

const scriptCrypto = document.createElement("script");
scriptCrypto.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
scriptCrypto.type = 'text/javascript';

head.appendChild(scriptMoment);
head.appendChild(scriptCrypto);
head.appendChild(scriptJquery);

scriptMoment.onload = momentF;
scriptCrypto.onload = cryptoF
scriptJquery.onload = handler;

function momentF() {
  const epoch = (moment().unix()).toString();
  console.log('Información del epoch', epoch)
  return epoch;
}

function cryptoF(shop, order_id) {
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, `${shop}__${order_id}`);
  hmac.update(momentF());
  var hash = hmac.finalize();
  return hash.toString();
}

function handler() {

  const body = $('body');
  const content = $('.content');

  content.css({
    'position': 'relative'
  })
  body.css({
    'position': 'relative'
  })

  const route = window.location.pathname;
  const arrayUrl = route.split('/');

  const shop = Shopify.shop;


  console.log('Funcionando el script');
  console.log(Shopify)

  fetch(`http://localhost:8080/api/user-settings-owner/56128372888`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        templateSettings(data.data);
      })
      .catch(e => console.log(e));


  const templateSettings = (settings) => {
    if (Shopify?.checkout && arrayUrl.length > 2 && arrayUrl[2] === 'checkouts') {
        console.log('Desde la función', settings);
        console.log('Tenemos informacion del checkout');
        const address = Shopify.checkout.billing_address.address1 !== Shopify.checkout.shipping_address.address1 && settings?.different_address_enabled;
        const ammount = Number(Shopify.checkout.subtotal_price) >= settings.order_amount_limit_enabled && settings?.order_amount_limit;
        const customerName = Shopify?.checkout?.billing_address?.first_name;

        if (address || ammount) {
          const createOrder = () => {
            const shopName = shop.split('.')[0];
            console.log(shopName);
            console.log('Información del hmac', cryptoF(shopName, Shopify.checkout.order_id));
          }
      
          const contentSquare = $(
            `<div />`
            ).css({
              'height': '100vh',
              'padding-top': '32px', 
              'width': '100vw', 
              'background-color': 'white', 
              'position': 'absolute', 
              'z-index': '99',
          });
      
          const infoUser = $(
            `<div>
              <div style="display: flex; flex-direction: column">
                  <h1 style="text-align: center; font-size: 22px; margin-bottom: 24px;">
                    Hi ${customerName}
                  </h1>
                  <p style="text-align: center; font-size: 22px; margin-bottom: 24px">
                    ID Verification is required to complete this purchase.
                  </p> 
                  <p style="text-align: center; font-size: 22px; margin-bottom: 24px">
                    This requirement is in place to protect you from credit-card 
                    fraud and ensure you are eligible to purchase this product. 
                  </p>
                  <p style="text-align: center; font-size: 22px; margin-bottom: 24px">
                    We partner with GlobaliD to keep your data private, secure and 
                    in your control every step of the way. 
                  </p>
                  <button
                    id="globalBtn"
                    style="background-color: #2563eb; padding: 16px 0px; width: 100%; border-radius: 32px; color: white;">
                  Enviar a global id</button>
              </div>
            </div>`
          ).css({
            'max-width': '600px',
            'margin': 'auto',
            'color': 'black',
            'padding': '0px 40px'
          });
      
          content.append(contentSquare);
          contentSquare.append(infoUser);


          const handlePostInfo = async () => {
            try {
              console.log('Mandando la información a globalID', shop, route);
              window.localStorage.setItem('link', `${shop}/${route}`);
              console.log(`${shop}/${route}`);
              window.location.replace("https://miguels-store-global.myshopify.com/apps/global-id");
            } catch (error) {
              console.log(error);
            }
          };

          //Función para redireccionar a pagina de globalID
          const buttonGlobal = document.querySelector('#globalBtn');
          buttonGlobal.addEventListener('click', () => createOrder());

        }
      }
  }
}
