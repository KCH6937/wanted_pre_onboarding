const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const ApplyHistory = require('./applyHistory');

class Job extends Model {}

Job.init({
    // 채용공고_id
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        foreignKey: 'job_id'
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
    modelName: 'job',
    timestamps: false
});

ApplyHistory.belongsTo(Job, { foreignKey: 'job_id', onDelete: 'cascade', onUpdate: 'cascade' });

module.exports = Job;