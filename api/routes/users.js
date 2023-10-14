// express 모듈에서 라우터를 가져옴
const router = require('express').Router();

// 사용자 모델을 가져오기 위해 '../models/User'를 require함
const User = require('../models/User');

// 포스트 모델을 가져오기 위해 '../models/Post'를 require함
const Post = require('../models/Post');

// 비밀번호 해싱을 위해 bcrypt 모듈을 가져옴
const bcrypt = require('bcrypt');

// 사용자 정보 업데이트 처리를 담당하는 라우트
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      // 비밀번호를 업데이트하는 경우, 새로운 솔트를 생성하고 비밀번호를 해싱함
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      // 사용자 ID에 해당하는 사용자 정보를 업데이트하고 업데이트된 정보를 반환
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      // 오류 발생 시 서버 오류 상태(500)로 오류 메시지를 JSON 형식으로 응답
      res.status(500).json(err);
    }
  } else {
    // 권한 없음 상태(401)로 메시지를 JSON 형식으로 응답
    res.status(401).json('You can update only your account!');
  }
});

// 사용자 삭제 처리를 담당하는 라우트
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      // 사용자 ID에 해당하는 사용자 정보를 찾음
      const user = await User.findById(req.params.id);
      try {
        // 사용자와 관련된 포스트를 삭제하고 사용자 정보를 삭제함
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
      } catch (err) {
        // 오류 발생 시 서버 오류 상태(500)로 오류 메시지를 JSON 형식으로 응답
        res.status(500).json(err);
      }
    } catch (err) {
      // 사용자를 찾을 수 없는 경우, 상태 404로 메시지를 JSON 형식으로 응답
      res.status(404).json('User not found!');
    }
  } else {
    // 권한 없음 상태(401)로 메시지를 JSON 형식으로 응답
    res.status(401).json('You can delete only your account!');
  }
});

// 특정 사용자 정보를 가져오는 라우트
router.get('/:id', async (req, res) => {
  try {
    // 사용자 ID에 해당하는 사용자 정보를 데이터베이스에서 찾음
    const user = await User.findById(req.params.id);

    // 사용자 정보 객체에서 비밀번호 필드를 제외한 나머지 필드를 추출
    const { password, ...others } = user._doc;

    // 성공 상태(200)로 사용자 정보(비밀번호 제외)를 JSON 형식으로 응답
    res.status(200).json(others);
  } catch (err) {
    // 오류 발생 시 서버 오류 상태(500)로 오류 메시지를 JSON 형식으로 응답
    res.status(500).json(err);
  }
});

module.exports = router;
