const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');

router.post('/create', companyController.create); // 회사 등록

router.delete('/delete', companyController.delete); // 회사 삭제

router.get('/findAll', companyController.findAll); // 회사 전체목록 불러오기

module.exports = router;