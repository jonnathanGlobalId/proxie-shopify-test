const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
  const dataOrder = req.body;
  try {
    //Verificar que la orden no exista
    const orderExist = await Order.findOne({order_id: dataOrder.order_id})
    console.log(orderExist);
    if (orderExist) {
      res.status(500).send({mensaje: 'La orden ya existe'})
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
    const orders = await Order.find({owner_id: idOwner.id});
    res.json({
      mensaje: 'Obteniendo las ordenes',
      data: orders
    });
  } catch (error) {
    console.log(error);
  }
}

exports.changeStatusOrder = async (req, res) => {
  const dataStatus = req.body;
  const idOrder = req.params;
  try {
    //Verificar que la orden exista
    const orderExisted = await Order.findOne({order_id: idOrder.id});
    if (!orderExisted) {
      res.status(404).json({mensaje: 'La orden no existe'});
    }

    //Cambiar el estado de la orden
    await Order.findOneAndUpdate({order_id: idOrder.id}, dataStatus, {new: true});
    res.json({mensaje: 'Cambiando el status de la orden'})
  } catch (error) {
    console.log(error);
  }
}

exports.acceptOrder = async (req, res) => {
  const orderId = req.body;
  try {
    const orderExist = await Order.findOne({idOrder: orderId.idOrder});
    if (!orderExist | orderExist.shopId.toString() !== orderId.shopId.toString()) {
      res.json({mensaje: 'La orden no existe o no tienes permiso para modificar la orden'})
      return
    }
    await Order.findOneAndUpdate({idOrder: orderId.idOrder}, {status: 'APRROVE'}, {new: true})
    res.json({
      mensaje: 'La orden ha sido aprobada con exito'
    });

  } catch (error) {
    console.log(error);
  }
}

exports.rejectOrder = async (req, res) => {
  const orderId = req.body;
  try {
    const orderExist = await Order.findOne({idOrder: orderId.idOrder});
    if (!orderExist | orderExist.shopId.toString() !== orderId.shopId.toString()) {
      res.json({mensaje: 'La orden no existe'})
      return
    }
    await Order.findOneAndUpdate({idOrder: orderId.idOrder}, orderId, {new: true})
    res.json({
      mensaje: 'La orden ha sido rechazada con exito'
    });

  } catch (error) {
    console.log(error);
  }
}