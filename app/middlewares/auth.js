const jwt      = require('jsonwebtoken')
const config   = require('../../config/config.json')

module.exports = () => {
   let middlewares = {}

   middlewares.auth = (req, res, next) => {
      if (req.path == '/login' || req.method == "OPTIONS") return next()
      const bearerHeader = req.headers['authorization']

      if (typeof bearerHeader !== 'undefined') 
      {
         const [type, bearerToken] = bearerHeader.split(' ')

         return jwt.verify(bearerToken, config.secret, (err, authData) => {
            req.token   = bearerToken
            req.decoded = authData
            return err ? res.status(401).json({ error: 'token inválido', details: err }) : next()
         })
      }
      else
         return res.status(403).json({ error: 'Token é obrigatório' })
   }

   return middlewares
}

