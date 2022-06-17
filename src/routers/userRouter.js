const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signUp', userController.signUp); // 유저 생성(회원가입)

router.get('/findAll', userController.findAll); // 가입된 전체 유저목록 불러오기

router.post('/apply', userController.apply); // 6. 사용자가 채용공고 지원

module.exports = router;