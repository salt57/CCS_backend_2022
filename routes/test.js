const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    res.json("Test Route")
})

module.exports = router;