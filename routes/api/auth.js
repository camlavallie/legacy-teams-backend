const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const {
  check,
  validationResult
} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');





// @route   Get api/auth
// @desc   Test Route
//@access  Public
router.get('/', auth, async (req, res) => {
  try{
const user = await User.findById(req.user.id).select('-password');
res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   Post api/auth
// @desc   Authenticate User & get token
//@access  Public
router.post(
  '/', 
[
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      email,
      password
    } = req.body;
    try {
      // See if User exists 
      let user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({
          errors: [{
            msg: 'Invalid Credentials'
          }]
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({
          errors: [{
            msg: 'Invalid Credentials'
          }]
        });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        {expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
    );

    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }


  });

module.exports = router;