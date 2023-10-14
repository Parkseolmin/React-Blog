const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// CREATE POST
router.post('/', async (req, res) => {
  // 클라이언트로부터 POST 요청을 받아 새 게시물을 생성하는 엔드포인트입니다.
  const newPost = new Post(req.body);
  try {
    // 새 게시물을 저장하고 성공적으로 저장되면 상태 코드 200과 함께 게시물을 응답합니다.
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    // 에러가 발생하면 상태 코드 500과 함께 에러 메시지를 응답합니다.
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
  // 클라이언트로부터 PUT 요청을 받아 게시물을 업데이트하는 엔드포인트입니다.
  try {
    // 요청된 ID에 해당하는 게시물을 찾습니다.
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // 게시물의 소유자와 요청한 사용자가 동일한 경우 게시물을 업데이트합니다.
      try {
        // 게시물을 업데이트하고 업데이트된 게시물을 반환합니다.
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        // 업데이트 중에 오류가 발생하면 상태 코드 500과 함께 에러 메시지를 응답합니다.
        res.status(500).json(err);
      }
    } else {
      // 소유자가 아닌 경우 상태 코드 401과 함께 오류 메시지를 응답합니다.
      res.status(401).json('You can update only your post!');
    }
  } catch (err) {
    // 게시물을 찾지 못한 경우 상태 코드 500과 함께 에러 메시지를 응답합니다.
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
  // 클라이언트로부터 DELETE 요청을 받아 게시물을 삭제하는 엔드포인트입니다.
  try {
    // 요청된 ID에 해당하는 게시물을 찾습니다.
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        // 게시물을 삭제하고 성공적으로 삭제되면 상태 코드 200과 함께 메시지를 응답합니다.
        await post.deleteOne();
        res.status(200).json('Post has been deleted...');
      } catch (err) {
        // 삭제 중에 오류가 발생하면 상태 코드 500과 함께 에러 메시지를 응답합니다.
        res.status(500).json(err);
      }
    } else {
      // 소유자가 아닌 경우 상태 코드 401과 함께 오류 메시지를 응답합니다.
      res.status(401).json('You can delete only your post!');
    }
  } catch (err) {
    // 게시물을 찾지 못한 경우 상태 코드 500과 함께 에러 메시지를 응답합니다.
    res.status(500).json(err);
  }
});

// GET POST
router.get('/:id', async (req, res) => {
  // 클라이언트로부터 GET 요청을 받아 특정 게시물을 반환하는 엔드포인트입니다.
  try {
    // 요청된 ID에 해당하는 게시물을 찾아 반환합니다.
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    // 게시물을 찾지 못한 경우 상태 코드 500과 함께 에러 메시지를 응답합니다.
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
  // 클라이언트로부터 GET 요청을 받아 모든 게시물을 반환하는 엔드포인트입니다.
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      // 특정 사용자의 게시물을 찾아 반환합니다.
      posts = await Post.find({ username });
    } else if (catName) {
      // 특정 카테고리의 게시물을 찾아 반환합니다.
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      // 모든 게시물을 반환합니다.
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    // 조회 중에 오류가 발생하면 상태 코드 500과 함께 에러 메시지를 응답합니다.
    res.status(500).json(err);
  }
});

module.exports = router;
