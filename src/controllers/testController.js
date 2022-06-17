const Company = require('../models/company');
const Job = require('../models/job');
const testJsons = require('../configs/testJson'); // Dummy Data
const User = require('../models/user');

const testController = {};

// 더미데이터 경로: /src/configs/testJson.js
/* 테스트 생성 - 회사, 채용공고 */
testController.createJobAndCompanyAndUser = async (req, res) => {
    //  회사 더미데이터 생성
    for(let json of testJsons.companyData) {
        await Company.create(json);
    }
    console.log("1234");
    
    const companyName = ['원티드랩', '네이버', '당근마켓', '구글', '구글코리아', '카카오', '원티드코리아'];
    const companyId = [];
    const json = [];

    // 채용공고 더미데이터 생성
    for(let i = 0; i < companyName.length; i++) {
        companyId[i] = await (await Company.findOne({ where: { name: companyName[i] }})).com_id;        
        json[i] = testJsons.jobData[i];
        json[i].com_id = companyId[i]; 
        await Job.create(json[i]);
    }

    // 유저 더미데이터 생성
    for(let json of testJsons.user) {
        await User.create(json);
    }

    console.log('Test Data generated');
    return res.send('테스트 생성');
}


module.exports = testController;