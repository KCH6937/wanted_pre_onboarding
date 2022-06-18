const Job = require('../models/job');
const Company = require('../models/company');
const { Op } = require('sequelize'); // 유사 검색을 위한 sequlize 기능 Op

const jobController = {};

/* params: model: Model, searchColumns: [String], keyword: [String | Integer] */
const searchTable = async (model = '', searchColumns = '', keyword = '') => {
    let columns = [];

    if(!(model && searchColumns && keyword)) {
        return null;
    }
    
    for(let i = 0; i < searchColumns.length; i++) {
        columns[i] = {
            [searchColumns[i]]: {
                [Op.like]: "%" + keyword + "%"
            }
        }
    }

    try {
        let data = await model.findAll({ where: { [Op.or]: columns } });
        return data.length !== 0 ? data : null;
    } catch(err) {
        console.log(err);
        return null;
    }
    
}

/* 1. 채용공고 등록 */
jobController.register = async (req, res) => {
    const data = {
        com_id: Number(req.body.id), // 회사_id
        position: req.body.position, // 채용포지션
        compensation: Number(req.body.compensation), // 보상금
        about: req.body.about, // 채용내용
        skill: req.body.skill, // 사용기술
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
        await Job.create(data);
        console.log('등록되었습니다.');
        console.log(data);
        return res.status(200).send('등록되었습니다.');
    } catch(err) {
        console.log(err);
        if(err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).send('존재하지 않는 회사_id 입니다.');
        } else {
            return res.status(500).send('Server Error');
        }
    }
}

/* 2. 채용공고 수정 */
jobController.update = async (req, res) => {
    const updatedData = {
        job_id: Number(req.params.id), // 채용공고_id
        position: req.body.position, // 채용포지션
        compensation: Number(req.body.compensation), // 채용보상금
        about: req.body.about, // 채용내용
        skill: req.body.skill // 채용기술
    }

    // Validation - 수정할 채용공고를 job_id 값으로 DB에서 찾아오는데 있는지 검증
    let job = await Job.findOne({ where: { job_id: updatedData.job_id } });
    let preJob = JSON.parse(JSON.stringify(job));
    if(!job) {
        console.log('존재하지 않는 채용공고입니다.');
        return res.status(400).send('존재하지 않는 채용공고입니다.');
    }

    for(let key in updatedData) {
        if(!updatedData[key]) {
            continue;
        } else {
            if(key !== 'job_id') {
                job[key] = updatedData[key];
            }
        }
    }

    try {
        await job.save(); // DB 반영
        console.log('수정되었습니다.');
        console.log(updatedData);
        return res.status(200).json({pre: preJob, now: job});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
}

/* 3. 채용공고 삭제하기 */
jobController.delete = async (req, res) => {
    const requestedId = Number(req.params.id); // 채용공고 id로 삭제
    
    // Validation - parameter가 숫자가 아니거나, 유효하지 않은 값일 경우
    if(!requestedId) {
        return res.status(400).send('유효하지 않은 채용공고 id입니다.');
    }

    // Validation - 삭제할 채용공고를 job_id 값으로 DB에서 찾아오는데 있는지 검증
    let job = await Job.findOne({ where: {job_id: requestedId } });
    if(!job) {
        console.log('존재하지 않는 채용공고입니다.');
        return res.status(400).send('존재하지 않는 채용공고입니다.');
    }

    try {
        await Job.destroy({ where: {job_id: requestedId } });
        console.log('삭제되었습니다.');
        return res.status(200).json({message: '삭제되었습니다.', '삭제된 채용공고': job});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Server Error')
    }
};

/* 4-1. 채용공고 목록 가져오기 */
jobController.findAll = async (req, res) => {
    try {
        const jobs = await Job.findAll();
        const jobList = [];

        // Vaildation - 채용공고 결과값이 하나도 없을경우
        if(jobs.length === 0) {
            console.log('채용공고가 하나도 없습니다.');
            return res.status(400).send('채용공고가 하나도 없습니다.');
        }

        for(let i = 0; i < jobs.length; i++) {
            const {
                job_id, // Primary Key - Model(Job)
                com_id, // Foreign Key - Model(Company)
                position,
                compensation,
                skill
            } = jobs[i];

            const {
                name,
                nation,
                area
            } = await Company.findByPk(com_id); // cascade - 회사가 삭제될 시 채용공고도 같이 삭제되므로 에러 처리필요 X

            jobList[i] = {
                '채용공고_id': job_id,
                '회사명': name,
                '국가': nation,
                '지역': area,
                '채용포지션': position,
                '채용보상금': compensation,
                '사용기술': skill,
            }
        }

        console.log(jobList);
        return res.status(200).send(jobList);

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
};

/* 4-2. 채용공고 검색 */
jobController.search = async (req, res) => {
    try {
        const keyword = req.query.search;
        
        const searchList = [];
        const existJobId = [];
        const columns = {
            company: [
                'name',
                'nation',
                'area'
            ],
            job: [
                'position',
                'skill'
            ]
        };

        // Validation - parameter가 유효하지 않을 경우
        if(!keyword) {
            return res.status(400).send('유효하지 않은 값입니다.');
        }
        
        let companyResult = await searchTable(Company, columns.company, keyword);
        let jobResult = await searchTable(Job, columns.job, keyword);

        // Validation - 검색 결과가 없을 경우
        if(!(companyResult || jobResult)) {
            console.log('검색결과가 없습니다.');
            return res.status(400).send('검색결과가 없습니다.');
        }

        if(companyResult) {
            for(let company of companyResult) {
                const job = await Job.findOne({ where: company.com_id });

                existJobId.push(job.job_id);
                searchList.push({
                    '채용공고_id': job.job_id,
                    '회사명': company.name,
                    '국가': company.nation,
                    '지역': company.area,
                    '채용포지션': job.position,
                    '채용보상금': job.compensation,
                    '사용기술': job.skill
                }); 
            }
        }

        if(jobResult) {
            for(let job of jobResult) {
                if(existJobId.includes(job.job_id)) {
                    continue;
                }

                const {
                    name,
                    nation,
                    area
                } = await Company.findOne({ where: { com_id: job.com_id } });

                searchList.push({
                    '채용공고_id': job.job_id,
                    '회사명': name,
                    '국가': nation,
                    '지역': area,
                    '채용포지션': job.position,
                    '채용보상금': job.compensation,
                    '사용기술': job.skill
                });
            }
        }
        
        console.log(searchList);
        return res.status(200).send(searchList);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}

/* 5. 채용 상세 */
jobController.detail = async (req, res) => {
    const jobId = req.params.id;
        
    // Validation - parameter가 유효하지 않을 경우
    if(!jobId) {
        console.log('유효하지 않는 job_id 입니다.');
        return res.status(400).send('유효하지 않는 job_id 입니다.');
    }

    try {
        const job = await Job.findByPk(jobId);

        // Vaildation - 채용공고 결과값이 없을경우
        if(!job) {
            console.log('채용공고가 하나도 없습니다.');
            return res.status(400).send('채용공고가 하나도 없습니다.');
        }

        const company = await Company.findByPk(job.com_id); // cascade - 회사가 삭제될 시 채용공고도 같이 삭제되므로 에러 처리필요 X

        const jobIds = (await Job.findAll({attributes: ['job_id'], where: { com_id: company.com_id } })).map(item => item.job_id);

        const detailInfo = {
            '채용공고_id': job.job_id,
            '회사명': company.name,
            '국가': company.nation,
            '지역': company.area,
            '채용포지션': job.position,
            '채용보상금': job.compensation,
            '사용기술': job.skill,
            '채용내용': job.about,
            '회사가올린다른채용공고': jobIds
        };

        console.log(detailInfo);
        return res.status(200).send(detailInfo);
    } catch(err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
}

module.exports = jobController;