const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const ApplyHistory = require('./applyHistory');

class User extends Model {}

User.init({
    // 사용자_id
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    // 사용자명
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
});

ApplyHistory.belongsTo(User, { foreignKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade' });

module.exports = User;