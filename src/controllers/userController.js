const ApplyHistory = require('../models/applyHistory');
const Job = require('../models/job');
const User = require('../models/user');

const userController = {};

/* 유저생성(회원가입) */
userController.signUp = async (req, res) => {
    const name = req.body.name;
    
    // Validation - 유효하지 않은 값일 경우
    if(!name) {
        console.log('유효하지 않은 값입니다.');
        return res.status(400).send('유효하지 않은 값입니다.');
    }

    try {
        await User.create({name});
        console.log('유저가 생성되었습니다.');
        return res.status(200).send(name +' 유저가 생성되었습니다.');
    } catch(err) {
        console.log('Server Error');
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

/* 가입된 전체 유저목록 불러오기 */
userController.findAll = async (req, res) => {
    const users = await User.findAll();

    // Validation - 유저가 결과값이 하나도 없을경우
    if(users.length === 0) {
        console.log('유저가 하나도 없습니다.');
        return res.status(400).send('유저가 하나도 없습니다.');
    }

    try {
        console.log(users);
        return res.send(users);
    } catch(err) {
        console.log('Server Error');
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

/* 6. 사용자가 채용공고 지원 */
userController.apply = async (req, res) => {
    const {
        job_id,
        user_id
    } = req.body;

    // Validation - 유효하지 않은 값일 경우
    if(!(job_id && user_id)) {
        console.log('유효하지 않은 값입니다.');
        return res.status(400).send('유효하지 않은 값입니다.');
    }

    let job = await Job.findByPk(job_id);
    let user = await User.findByPk(user_id);
    
    // Validation - 지원하고자 하는 채용공고가 없을 경우
    if(!job) {
        console.log('지원하고자 하는 채용공고가 없습니다.');
        return res.status(400).send('지원하고자 하는 채용공고가 없습니다.');
    }
    
    // Validation - 지원하고자 하는 사용자가 없을 경우
    if(!user) {
        console.log('지원하고자 하는 사용자가 없습니다.');
        return res.status(400).send('지원하고자 하는 사용자가 없습니다.');
    }

    try {
        await ApplyHistory.create({ job_id, user_id });
        console.log('지원 완료');
        res.status(200).json({ message: `${user.name}님이 지원했습니다.`, '지원한 채용공고': job });
    } catch(err) {
        console.log('Server Error');
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

module.exports = userController;