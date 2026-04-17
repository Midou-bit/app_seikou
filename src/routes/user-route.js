const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user-model')
const private_key = require('../auth/private_key')

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      return res.status(404).json({ message: 'utilisateur non trouvé' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' })
    }

    const token = jwt.sign(
      { userId: user._id, name: user.username },
      private_key,
      { expiresIn: '2h' }
    )

    res.json({
      message: 'utilisateur connecté',
      data: user,
      token: token
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { userLogin }
