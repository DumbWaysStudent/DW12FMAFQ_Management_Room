const models = require('../models')
const customers = models.customers
const rooms = models.rooms
const orders = models.orders

exports.detail = async (req, res) => {
  const result = await rooms.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: orders,
        as: "order",
        required: false,
        where: { is_booked: true },
        attributes: ['id', 'is_done', 'is_booked', 'duration', 'order_end_time'],
      }
    ],
    order: [
      ['id', 'ASC']
    ]
  });
  res.send(result)
}

exports.checkRoom = async (req, res) => {
  const roomId = req.params.roomId
  const result = await rooms.findOne({
    attributes: ['id', 'name'],
    include: [
      {
        model: orders,
        as: "order",
        required: false,
        where: { is_booked: true },
        attributes: ['id', 'is_done', 'is_booked', 'duration', 'order_end_time'],
        include: [
          {
            model: customers,
            as: 'customer'
          }
        ]
      },
    ],
    order: [
      ['createdAt', 'DESC']
    ],
    where: { id: roomId }
  });
  res.send(result)
}
// exports.checkRoom = async (req, res) => {
//   const roomId = req.params.roomId
//   const result = await orders.findOne({
//     include: [
//       {
//         model: rooms,
//         as: "rooms",
//       },
//       {
//         model: customers,
//         as: 'customers'
//       }],
//     order: [
//       ['createdAt', 'DESC']
//     ],
//     where: { room_id: roomId }
//   });
//   res.send(result)
// }

// exports.getOrders = async (req, res) => {
//   try {
//     const result = await orders.findAll({
//       order: [['order_end_time', 'ASC']],
//       where: { is_done: false },
//       attributes: ['id', 'room_id', 'order_end_time', 'is_done']
//     })
//     res.send(result)
//   } catch (error) {
//     res.send(error)
//   }
// }

exports.checkin = async (req, res) => {
  const result = await orders.create(req.body)
  console.log(result, req.body)
  res.send({
    body: result,
  })
}

exports.edit = async (req, res) => {
  const orderId = req.params.id
  const result = await orders.update(req.body, { where: { id: orderId } })
  res.send(result)
} 