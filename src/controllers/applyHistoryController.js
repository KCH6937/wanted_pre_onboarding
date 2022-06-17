const ApplyHistory = require('../models/applyHistory');

const applyHistoryController = {};

/* 채용공고 지원내용 모두 불러오기 */
applyHistoryController.findAll = async (req, res) => {
    const applyHistories = await ApplyHistory.findAll();

    // Validation - 채용공고 지원내용이 하나도 없을 경우
    if(applyHistories.length === 0) {
        console.log('지원내역이 하나도 없습니다.');
        return res.status(400).send('지원내역이 하나도 없습니다.');
    }

    try {
        console.log(applyHistories);
        return res.send(applyHistories);
    } catch(err) {
        console.log('Server Error');
        console.log(err);
        return res.send('Server Error');
    }
}


module.exports = applyHistoryController;