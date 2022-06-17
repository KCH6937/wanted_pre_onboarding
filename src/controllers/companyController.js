const Company = require('../models/company');

const companyController = {};

/* 회사 등록 */
companyController.create = async (req, res) => {

    const data = {
        name: req.body.name, // 회사명
        nation: req.body.nation, // 국가
        area: req.body.area, // 지역
    };

    // Validation - 유효하지 않은 값일 경우
    for(let key in data) {
        if(!data[key]) {
            console.log('유효하지 필드 또는 값입니다.');
            console.log(data);
            return res.status(400).send('유효하지 필드 또는 값입니다.');
        }
    }
    
    // DB Insert
    try {
        await Company.create(data);
        console.log('등록되었습니다.');
        console.log(data);
        return res.status(200).send('등록되었습니다.');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

/* 회사 삭제 */
companyController.delete = async (req, res) => {
    const requestedId = Number(req.params.id); // 회사 id로 삭제
    
    // Validation - parameter가 숫자가 아니거나, 유효하지 않은 값일 경우
    if(!requestedId) {
        return res.status(400).send('유효하지 않은 회사 id입니다.');
    }

    // Validation - 삭제할 회사를 com_id 값으로 DB에서 찾아오는데 있는지 검증
    let job = await Company.findOne({ where: {com_id: requestedId } });
    if(!job) {
        console.log('존재하지 않는 회사입니다.');
        return res.status(400).send('존재하지 않는 회사입니다.');
    }

    try {
        await Company.destroy({ where: {com_id: requestedId } });
        console.log('삭제되었습니다.');
        return res.status(200).send('삭제되었습니다.');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Server Error')
    }
};

/* 회사 전체목록 불러오기 */
companyController.findAll = async (req, res) => {
    const companies = await Company.findAll();

    // Vaildation - 회사가 하나도 없을경우
    if(companies.length === 0) {
        console.log('회사가 하나도 없습니다.');
        return res.status(400).send('회사가 하나도 없습니다.');
    }

    res.send(companies);
};

module.exports = companyController;