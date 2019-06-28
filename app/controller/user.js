const router = require("express").Router();
const userService = require("../service/user");
const auth = require("../helper/auth");
router.get("", (req, res) => {
  res.json(userService.findAll());
});

router.post("", (req, res) => {
  res.json(userService.create(req.body));
});

router.get("/:id", auth.authenticate(), (req, res) => {
  res.json(userService.getById(req.params.id));
});

router.put("/:id", auth.authenticate(), (req, res) => {
  res.json(userService.update(req.params.id, req.body));
});

router.delete("/:id", auth.authenticate(), (req, res) => {
  res.json(userService.delete(req.params.id));
});

module.exports = router;
