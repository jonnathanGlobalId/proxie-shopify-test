const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
  const dataOrder = req.body;
  try {
    //Verificar que la orden no exista
    const orderExist = await Order.findOne({idOrder: dataOrder.idOrder})
    if (orderExist) {
      res.json({mensaje: 'La orden ya existe'})
      return
    }
    
    //Crear la orden
    await Order(dataOrder).save()
    res.json({
      mensaje: 'Vamos a crear una nueva orden'
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getAllOrders = async (req, res) => {
  const idOwner = req.params;
  try {
    console.log(idOwner);
    const orders = await Order.find({ownerId: idOwner.id});
    res.json({
      mensaje: 'Obteniendo las ordenes',
      data: orders
    });
  } catch (error) {
    console.log(error);
  }
}