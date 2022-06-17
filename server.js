const express = require('express');
const sequelize = require('./src/configs/database'); // sequelize: ORM 지원 라이브러리
const request = require('request'); // api 호출 라이브러리

const app = express();
const port = 3306;

sequelize.sync({ force: true }).then(() => console.log('DB is now ready')); // sync({ force: true }) => 서버 실행마다 DB 초기화 - 테스트 데이터 충돌 방지 예뱡

// static files 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/user', require('./src/routers/userRouter'));
app.use('/company', require('./src/routers/companyRouter'));
app.use('/job', require('./src/routers/jobRouter'));
app.use('/applyHistory', require('./src/routers/applyHistoryRouter'));
app.use('/test', require('./src/routers/testRouter'));

request({url: `http://localhost:${port}/test/create`,method: "POST"}); // 서버 시작 시 채용공고, 회사, 유저 자동생성

// Error middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.send('잠시 후에 다시 시도해주세요');
});

// starting the server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});