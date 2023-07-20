const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "dudgeudeuhdddedjjeieeieiwi"



router.post("/registeruser", [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'incorrect password').isLength({ min: 6 })], async (req, res) => {

    const navigate = useNavigate();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const securedpassword = await bcrypt.hash(req.body.password, salt)
    try {
      await User.create({
        name: req.body.name,
        password: securedpassword,
        email: req.body.email,
        location: req.body.location
      });
      res.json({ success: true });
      navigate('/login');
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error registering user' });
    }
  });

router.post("/loginuser",
  [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 6 })], async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
      try {
        let userData = await User.findOne({ email });
        if (!userData) {
          res.status(400).json({ success: false, error: 'Enter valid credentials' });
        }

        const passwordCompared = await bcrypt.compare(req.body.password, userData.password)

        if (!passwordCompared) {
          res.status(400).json({ success: false, error: 'Enter valid credentials' });
        }
        const data = {
          user: {
            id: userData.id
          }
        }

        const authToken = jwt.sign(data, jwtSecret)
        return res.json({ success: true, authToken:authToken });

      } catch (error) {
        console.error(error);
        res.json({ success: false });
      }
    });

module.exports = router;
