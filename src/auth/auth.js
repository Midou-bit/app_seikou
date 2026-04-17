const jwt = require('jsonwebtoken')
const private_key = require('./private_key')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).json({ message: "Vous n'avez pas fourni de jeton d'authentification" })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(token, private_key)

    if (req.body.userId && req.body.userId !== decoded.userId) {
      return res.status(401).json({ message: 'invalid identifier' })
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: "Vous n'avez pas fourni de jeton d'authentification" })
  }
}
