const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  Users.create({
    username: username,
    password: hash,
  });

  res.json("SUCESS");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username } });

  if (!user) return res.json({ error: "User Doesn't Exist" });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.json({ error: "Wrong Username And Password Combination" });

  const accessToken = sign(
    { username: user.username, id: user.id },
    "importantsecret"
  );

  res.json({ token: accessToken, username: user.username, id: user.id });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) return res.json({ error: "Wrong Password Entered" });

  const hash = await bcrypt.hash(newPassword, 10);

  await Users.update({ password: hash }, { where: { id: user.id } });

  return res.json("sucess");
});

module.exports = router;
