const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const JobPosting = require('./jobPosting');

class Company extends Model {}

Company.init({
    // 회사_id
    com_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: 'com_id', // ?
        autoIncrement: true,
        primaryKey: true
    },
    // 회사명
    name: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true
    },
    // 국가
    nation: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    // 지역
    area: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'company',
    timestamps: false
});

JobPosting.belongsTo(Company, { foreignKey: 'com_id', onDelete: 'cascade', onUpdate: 'cascade'});

module.exports = Company;