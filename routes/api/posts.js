const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/post');
const User = require('../../model/user');

// @route   Get api/posts
// @desc    Create a post
//@access   Private
router.post('/', [auth, [
    check('text', 'text is required')
    .not()
    .isEmpty()
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });

    }

    try {

      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        title: req.body.title,
        resource: req.body.resource,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });


      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);




// @route  Get api/posts
// @desc   Get all posts
// @access public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1
    });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});




// @route  Get api/post/:id
// @desc   Get post by id
// @access public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.status(500).send('Server Error');
  }
});




// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access public
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'User not authorized'
      });
    }

    await post.remove();

    res.json({
      msg: 'Post removed'
    });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Post not found'
      });
    }
    res.status(500).send('Server Error');
  }
});


// get a single post
router.get("/:id", [auth], async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res
      .status(404)
      .send("The testimony with the given ID was not found");

  res.send(post);
});
module.exports = router;



router.put("/:id", [auth, [
    check('text', 'text is required')
    .not()
    .isEmpty()
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });


    }

    try {

      const updatePost = await Post.findByIdAndUpdate(
        req.params.id, {
          title: req.body.title,
          resource: req.body.resource,
          text: req.body.text,
        }, {
          new: true
        });

      const post = await updatePost.save();

      res.send(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);