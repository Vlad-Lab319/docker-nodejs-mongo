const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    })
  } catch (error) {
    console.error(error);
    res
    .status(400)
    .json({error});
  }

}

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      status: 'success',
      data: {
        post,
      }
    })
  } catch (error) {
    console.error(error);
    res
    .status(400)
    .json({error});
  }

}

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (error) {
    console.error(error);
    res
    .status(400)
    .json({error});
  }

}

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: 'success',
      data: {
        post,
      }
    })
  } catch (error) {
    console.error(error);
    res
    .status(400)
    .json({error});
  }

}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
     
    })
  } catch (error) {
    console.error(error);
    res
    .status(400)
    .json({error});
  }

}