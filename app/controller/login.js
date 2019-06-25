const router = require('express').Router();
const userService = require('../service/login');
const myConfig = require('config');
const config = myConfig.get('Config');
const jwt = require('jwt-simple');

router.post('', async (req, res) => {
  const { userId, password } = req.body;
  let msg = '';
  if (userId == undefined || password == undefined) {
    msg = 'Please fill in userId or password';
  }
  const result = await userService.login(userId, password);
  if (result) {
    const token = jwt.encode({ userId }, config.auth.jwtSecret);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, msg });
  }
});

module.exports = router;
