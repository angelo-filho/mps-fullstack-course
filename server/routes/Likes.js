const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Likes } = require("../models");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({ where: {
    PostId,
    UserId
  } })

  if (found) {
    await Likes.destroy({ where: {
      id: found.id,
    } });

    return res.json({ liked: false });
  }

  await Likes.create({ PostId, UserId });

  res.json({ liked: true });
});

module.exports = router;