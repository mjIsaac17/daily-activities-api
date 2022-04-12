const ApiError = require('../error/apiError');
const User = require('../models/User.model');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res, next) {
    try {
      //Validate if email already exis
      const email = await User.findOne({ email: req.body.email });
      if (email) {
        return next(ApiError.badRequest('The email already exists'));
      }

      // User is valid, let's save it
      const user = new User({
        ...req.body,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString()
      });
      await user.save();
      res.status(201).json({ user });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }

  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        // Email does not exist
        return next(ApiError.badRequest('Invalid user or password'));
      }

      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      const password = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (password !== req.body.password) {
        // Invalid password
        return next(ApiError.badRequest('Invalid user or password'));
      }

      delete user._doc.password;

      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1y' }
      );

      res.status(200).json({ user: { ...user._doc, token } });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }
}

module.exports = new AuthController();
