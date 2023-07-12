const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

router.post("/registeruser", [
  body('email').isEmail(),
  body('name').isLength({ min:5}),
  body('password', 'incorrect password').isLength({ min:6})], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
  try {
    await User.create({
      name:req.body.name,
      password:req.body.password,
      email: req.body.password,
      location: req.body.location
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error registering user' });
  }
});

module.exports = router;
