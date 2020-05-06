const express = require("express");
const posts = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  posts
    .get()
    .then((posts) => {
      res.status(201).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get posts" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  posts
    .getById(id)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to get ID" });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  posts
    .remove(id)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to delete post" });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;
  const response = req.body;
  posts
    .update(id, response)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update the post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  posts.getById(id).then((post) => {
    if (!post) {
      return res.status(400).json({ message: "No post found" });
    } else {
      next();
    }
  });
}

module.exports = router;
