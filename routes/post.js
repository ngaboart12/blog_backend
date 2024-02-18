const express = require("express");
const route = express.Router();
const Post = require("../models/posts");
const Users = require("../models/users");

route.get("/", async (req, res) => {
    try {
      const getPost = await Post.find();
  
      res.status(200).json({ data: getPost });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

route.post("/addPost/:id", async (req, res) => {
  try {
    const exist = await Users.findOne({ _id: req.params.id });
    if (!exist) {
      return res.status(401).json({ message: "No User Found" });
    }
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author_id: req.params.id,
    });
    const saved  = await newPost.save();
    res.status(200).json({ data: newPost, message: "successfully Post" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
route.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Post.deleteOne({
      _id: req.params.id,
     
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.put("/update/:id", async (req, res) => {
  try {
    const result = await Post.updateOne(
      { _id: req.body.id, author_id: req.params.id },
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "no post found" });
    }

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = route;
