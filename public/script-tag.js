const head = document.getElementsByTagName("head")[0]

const scriptJquery = document.createElement("script");
scriptJquery.src = "https://code.jquery.com/jquery-3.4.1.min.js";
scriptJquery.type = "text/javascript";

head.appendChild(scriptJquery);
scriptJquery.onload = handler;

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
  const shopName = shop.split('.')[0];

  console.log('Funcionando el script');
  console.log(Shopify)

  if (Shopify?.checkout && arrayUrl.length > 2 && arrayUrl[2] === 'checkouts') {
    fetch(`https://shopify-lt.loca.lt/configuration?shop=${shopName}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      templateSettings(data.settings);
    })
    .catch(e => console.log(e));
  }


  const templateSettings = (settings) => {
    console.log('Desde la función', settings);
    console.log('Tenemos informacion del checkout');
    const ammountSettings = Number(settings.order_amount_limit);
    const ammountEnable = settings.order_amount_limit_enabled;
    const addressEnable = settings?.different_address_enabled;
    console.log('Precio maximo', ammountSettings);
    console.log('Costo disponible', ammountEnable);
    console.log('Direccion disponible', addressEnable);

    const address = Shopify.checkout.billing_address.address1 !== Shopify.checkout.shipping_address.address1 && addressEnable;
    const ammount = Number(Shopify.checkout.subtotal_price) >= ammountSettings && ammountEnable;
    const customerName = Shopify?.checkout?.billing_address?.first_name;

    if (address || ammount) {
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
                  Begin Verification</button>
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
            console.log('Mandando la información a globalID', window.location.href);
            window.localStorage.setItem('link', window.location.href);
            const order_id = Shopify.checkout.order_id;
            const state = `${shopName}__${order_id}`;
            window.location.replace(`https://connect.globalid.dev/?client_id=fd61f598-aeca-47a1-b379-d1356e4ecc50&response_type=code&scope=openid&redirect_uri=https://apps.globalid.dev/v1/shopify-plugin/order/add&login=false&acrc_id=86db6c94-443d-44af-ad9a-fa9e0eb3e1d2&state=${state}&nonce=<INSERT_NONCE_HERE>&document_id=tos pp`);
          } catch (error) {
            console.log(error);
          }
        };

        //Función para redireccionar a pagina de globalID
        const buttonGlobal = document.querySelector('#globalBtn');
        buttonGlobal.addEventListener('click', () => handlePostInfo());
      }
  }
}
