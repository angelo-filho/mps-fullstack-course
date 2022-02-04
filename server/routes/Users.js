const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

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

  const accessToken = sign({ username: user.username, id: user.id }, "importantsecret")

  res.json(accessToken);
});

module.exports = router;
