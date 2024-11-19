const express = require("express");
const { getLogs, createLog } = require("../controllers/logController");

const router = express.Router();

router.get("/", getLogs);
router.post("/", createLog); // Add POST route to create a log

module.exports = router;
