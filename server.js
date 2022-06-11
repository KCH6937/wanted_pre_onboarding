const express = require('express');
const sequelize = require('./src/configs/database');

const app = express();
const port = 3306;

sequelize.sync({ force: true }).then(() => console.log('db is ready')); // force: true => 서버 실행마다 DB 초기화(개발 단계라 설정해둠)

// static files 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/user', require('./src/routers/userRouter'));

// Error middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.send('잠시 후에 다시 시도해주세요');
});

// starting the server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});