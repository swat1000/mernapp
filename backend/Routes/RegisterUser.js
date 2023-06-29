const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/registeruser", async (req, res) => {
  try {
    await User.create({
      name: "Swatantra",
      password: "swat@123",
      email: "xyz@gmail.com",
      location: "Mumbai"
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error registering user' });
  }
});

module.exports = router;
