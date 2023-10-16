// Express 프레임워크를 가져와서 app 변수에 할당
const express = require('express');
const app = express();

// 환경 변수 및 모듈을 가져오기 위해 dotenv 및 mongoose 모듈을 가져옴
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 사용자 인증 라우트가 정의된 모듈을 가져옴
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');

// 환경 변수를 .env 파일에서 로드
dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

// MongoDB에 연결
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB'); // MongoDB 연결 성공 시 콘솔에 메시지 출력
  })
  .catch((err) => console.log(err)); // MongoDB 연결 실패 시 에러 메시지 출력

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images'); // 파일 업로드 경로 설정
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // 업로드된 파일의 이름 설정
  },
});

const upload = multer({ storage: storage });

// 파일 업로드 요청 처리
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('파일이 업로드 되었다!');
});

// "/api/auth" 경로로 들어오는 모든 요청에 대해 authRoute 모듈을 사용
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

// 서버를 5000 포트에서 실행하고 서버 실행 메시지를 콘솔에 출력
app.listen('5000', () => {
  console.log('Backend is running');
});
