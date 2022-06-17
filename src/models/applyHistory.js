const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

class ApplyHistory extends Model {}

ApplyHistory.init({
    // 지원_id
    apply_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }    
}, {
    sequelize,
    modelName: 'applyHistory',
    timestamps: false
});

module.exports = ApplyHistory;