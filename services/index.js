require('express-group-routes')

const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const mkdirp = require('mkdirp')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirCoverManga = 'uploads/cover/'
        mkdirp(dirCoverManga.toString(), null)
        cb(null, dirCoverManga)
    },
    filename: function (req, file, cb) {
        const dirCoverManga = 'uploads/cover/'
        mkdirp(dirCoverManga.toString(), null)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dirPageManga = 'uploads/page/'
        mkdirp(dirPageManga.toString(), null)
        cb(null, dirPageManga)
    },
    filename: function (req, file, cb) {
        const dirPageManga = 'uploads/page/'
        mkdirp(dirPageManga.toString(), null)
        cb(null, file.originalname)
    }
})
const uploadImage = multer({ storage: storageImage })

const app = express()
const port = 5000
app.use('/mangaky/uploads/cover/', express.static('uploads/cover'))
app.use('/mangaky/uploads/page/', express.static('uploads/page'))
app.use(bodyParser.json())

const authController = require('./controller/authController')
const customerController = require('./controller/customerController')
const roomController = require('./controller/roomController')
const orderController = require('./controller/orderController')
const authenticating = require('./middleware')

app.group("/api/v2", (router) => {
    // Authentication API
    router.post('/register', authController.register)// signup
    router.post('/login', authController.login)// login
    router.get('/users', authController.show)

    // Customers API
    router.get('/customers', customerController.show)
    router.post('/customers/add', customerController.add)
    router.put('/customers/edit/:customerId', customerController.edit)
    router.get('/customers/detail/:customerId', customerController.detail)

    // Rooms API
    router.get('/rooms', roomController.show)
    router.post('/rooms/add', roomController.add)
    router.put('/rooms/edit/:roomId', roomController.edit)
    router.get('/rooms/detail/:roomId', roomController.detail)

    // Orders API
    router.get('/orders/checkin', orderController.detail)
    router.get('/orders/checkroom/:roomId', orderController.checkRoom)
    // router.get('/orders/check', orderController.getOrders)
    router.post('/orders/add', authenticating, orderController.checkin)
    router.put('/orders/edit/:id', orderController.edit)

})

app.listen(port, () => console.log(`Listening on port ${port}!`))