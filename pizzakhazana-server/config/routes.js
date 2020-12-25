const authRoutes = require('../routes/auth')
const pizzaRoutes = require('../routes/pizza')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')
const  employeeRoutes = require('../routes/employee')



module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/pizza', pizzaRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
  app.use('/employee', employeeRoutes)
}
