// express 모듈에서 라우터를 가져옴
const router = require('express').Router();

// 사용자 모델을 가져오기 위해 '../models/User'를 require함
const User = require('../models/User');

// 비밀번호 해싱을 위해 bcrypt 모듈을 가져옴
const bcrypt = require('bcrypt');

// 회원 가입 처리를 담당하는 라우트
router.post('/register', async (req, res) => {
  try {
    // 비밀번호 해싱을 위해 솔트(salt) 생성
    const salt = await bcrypt.genSalt(10);

    // 사용자가 제공한 비밀번호를 해싱함
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // 새로운 사용자 객체 생성
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // 사용자 정보를 데이터베이스에 저장하고 저장된 사용자 정보를 반환
    const user = await newUser.save();

    // 성공 상태(200)로 사용자 정보를 JSON 형식으로 응답
    res.status(200).json(user);
  } catch (err) {
    // 오류 발생 시 서버 오류 상태(500)로 오류 메시지를 JSON 형식으로 응답
    res.status(500).json(err);
  }
});

// 로그인 처리를 담당하는 라우트
router.post('/login', async (req, res) => {
  try {
    // 사용자 이름을 기준으로 데이터베이스에서 사용자를 찾음
    const user = await User.findOne({
      username: req.body.username,
    });

    // 사용자가 존재하지 않으면 잘못된 자격 증명 메시지와 함께 상태 400으로 응답
    !user && res.status(400).json('Wrong credentials!');

    // 사용자의 비밀번호를 비교하여 일치하지 않으면 잘못된 자격 증명 메시지와 함께 상태 400으로 응답
    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json('Wrong credentials!');

    // 사용자 객체에서 비밀번호 필드를 제외한 나머지 필드를 추출
    const { password, ...others } = user._doc;

    // 성공 상태(200)로 사용자 정보(비밀번호 제외)를 JSON 형식으로 응답
    res.status(200).json(others);
  } catch (err) {
    // 오류 발생 시 서버 오류 상태(500)로 오류 메시지를 JSON 형식으로 응답
    res.status(500).json(err);
  }
});

module.exports = router;
