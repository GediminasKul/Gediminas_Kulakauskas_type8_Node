/* eslint-disable camelcase */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { regUser, loginUser } = require('../model/userModel');
const { validateRegisteredUser, validateLoginUser } = require('../middleware');

const userRoutes = express.Router();

userRoutes.post('/registration', validateRegisteredUser, async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      full_name,
      email,
      password: hashedPassword,
    };
    await regUser(newUser.full_name, newUser.email, newUser.password);
    res
      .status(201)
      .json({ success: true, message: 'User registration successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

userRoutes.post('/login', validateLoginUser, async (req, res) => {
  try {
    const { email, password } = req.body;
    const [loginResult] = await loginUser(email);
    if (!loginResult) {
      res
        .status(500)
        .json({ success: false, message: 'email or password incorrect' });
      return;
    }
    if (!bcrypt.compareSync(password, loginResult.password)) {
      res
        .status(500)
        .json({ success: false, message: 'email or password incorrect' });
      return;
    }
    const paylod = { userId: loginResult.id };
    const token = jwt.sign(paylod, jwtSecret, { expiresIn: '1h' });

    // eslint-disable-next-line object-curly-newline
    res.json({ success: true, msg: 'login success', paylod, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
});

module.exports = userRoutes;
