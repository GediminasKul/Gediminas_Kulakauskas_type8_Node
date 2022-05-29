const express = require('express');
const { validateToken } = require('../middleware');
const { getAllGroups, postNewGroup } = require('../model/groupModel');

const groupRoutes = express.Router();

groupRoutes.get('/groups', validateToken, async (req, res) => {
  try {
    const data = await getAllGroups();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
});

groupRoutes.post('/groups', validateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const data = await postNewGroup(name);
    if (data.affectedRows === 1) {
      res
        .status(201)
        .json({ success: true, message: 'Group was create successful' });
      return;
    }
    throw new Error('something went wrong posting group');
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = groupRoutes;
