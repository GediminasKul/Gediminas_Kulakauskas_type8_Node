const express = require('express');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../middleware');
const { findUserByEmail } = require('../model/userModel');

userRoutes.post('/login', validateUser, async (req, res) => {
  const inputEmail = req.body.email;
  const inputPass = req.body.password;

  const foundUser = await findUserByEmail(inputEmail);
  console.log('foundUser ===', foundUser);
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  if (!bcrypt.compareSync(inputPass, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  res.json({ success: true });
});

module.exports = userRoutes;
