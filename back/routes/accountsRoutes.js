const express = require('express');
const { validateToken } = require('../middleware');
const { getGroupsUser, insertUserIntoGroup } = require('../model/accountModel');

const accountRoutes = express.Router();

accountRoutes.get('/accounts', validateToken, async (req, res) => {
  try {
    const id = req.userId;
    const data = await getGroupsUser(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'something went wrong',
    });
  }
});

accountRoutes.post('/accounts', validateToken, async (req, res) => {
  const { groupId } = req.body;
  try {
    const id = req.userId;
    const data = await insertUserIntoGroup(groupId, id);
    if (data.affectedRows) {
      res.status(201).json({
        success: true,
        msg: 'added successfully',
      });
      return;
    }
    res.status(500).json({
      success: false,
      msg: 'something went wrong',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'something went wrong',
    });
  }
});

module.exports = accountRoutes;
