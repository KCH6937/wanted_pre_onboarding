const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController');

router.post('/create', testController.createJobAndCompanyAndUser); // test code - 회사, 채용공고, 유저 자동 생성 | 더미데이터 경로: /src/config/testJson.js

module.exports = router;