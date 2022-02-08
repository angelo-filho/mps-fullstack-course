const { Posts, Likes } = require("../models");
const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.get("/", validateToken, async (req, res) => {
  const posts = await Posts.findAll({ include: [Likes] });

  const likedPosts = await Likes.findAll({
    where: {
      UserId: req.user.id,
    }
  })

  res.json({ posts: posts, likedPosts});
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);

  res.json(post);
});

router.get("/byUserId/:userId", async (req, res) => {
  const UserId = req.params.userId;
  const post = await Posts.findAll({
    where: { UserId },
    include: [Likes],
  }); 

  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;

  await Posts.create(post);

  res.json(post);
});

router.put("/title", validateToken, async (req, res) => {
  const { title, id } = req.body;

  await Posts.update({ title }, { where: { id } });

  res.json(title);
});

router.put("/text", validateToken, async (req, res) => {
  const { postText, id } = req.body;

  await Posts.update({ postText }, { where: { id } });

  res.json(postText);
});

router.delete("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const post = await Posts.destroy({where : { id }});

  res.json(post);
});

module.exports = router;
