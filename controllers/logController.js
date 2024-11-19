const InventoryLog = require("../models/InventoryLog");

const getLogs = async (req, res) => {
  try {
    const logs = await InventoryLog.findAll({ include: ["Product"] });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLog = async (req, res) => {
  const { ProductID, Action, Quantity } = req.body;

  try {
    const log = await InventoryLog.create({ ProductID, Action, Quantity });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getLogs,
  createLog,
};
