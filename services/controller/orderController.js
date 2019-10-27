const models = require('../models')
const customers = models.customers
const rooms = models.rooms
const orders = models.orders

exports.show = async (req, res) => {
  const result = await orders.findAll({
    include: [
      {
        model: rooms,
        as: "rooms"
      },
      {
        model: customers,
        as: "customers"
      }
    ]
  })
  res.send(result)
}
exports.checkRoom = async (req, res) => {
  const roomId = req.params.roomId
  const result = await orders.findOne({
    include: [
      {
        model: rooms,
        as: "rooms"
      },
      {
        model: customers,
        as: "customers"
      }
    ],
    order: [
      ['createdAt', 'DESC']
    ],
    where: { room_id: roomId }
  })
  res.send(result)
}
