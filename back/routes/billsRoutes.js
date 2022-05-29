const express = require('express');
const { validateToken } = require('../middleware');
const { getBills, postBills } = require('../model/billsModel');

const billsRoutes = express.Router();

billsRoutes.get('/bills/:groupId', validateToken, async (req, res) => {
  try {
    const { groupId } = req.params;
    const data = await getBills(groupId);
    res.status(200).json({
      success: true,
      msg: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'something went wrong',
    });
  }
});

billsRoutes.post('/bills', validateToken, async (req, res) => {
  const { groupId, amount, description } = req.body;
  try {
    const data = await postBills(groupId, amount, description);
    if (data.affectedRows) {
      res.status(200).json({
        success: true,
        msg: 'Bill was created successfully',
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

module.exports = billsRoutes;
