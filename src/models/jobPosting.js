const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

class JobPosting extends Model {}

JobPosting.init({
    // 채용공고_id
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // 채용포지션
    position: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    // 채용보상금
    compensation: {
        type: DataTypes.INTEGER(20),
        allowNull: true
    },
    // 사용기술
    skill: {
        type: DataTypes.STRING(35),
        allowNull: false
    },
    // 채용내용
    about: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'jobPosting',
    timestamps: false
});

module.exports = JobPosting;