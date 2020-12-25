const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../'))

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb+srv://vikram:vikram123@cluster0-308yg.mongodb.net/pizzaKhazana?retryWrites=true&w=majority',
    port: 5000
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
