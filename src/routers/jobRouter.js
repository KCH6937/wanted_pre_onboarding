const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobController');

router.post('/register', jobController.register); // 1. 채용공고 등록

router.put('/update/:id', jobController.update); // 2. 채용공고 수정

router.delete('/delete/:id', jobController.delete); // 3. 채용공고 삭제

router.get('/findAll', jobController.findAll); // 4-1. 채용공고 목록 가져오기

router.get('/', jobController.search); // 4-2. 채용공고 검색

router.get('/detail/:id', jobController.detail); // 5. 채용 상세

module.exports = router;