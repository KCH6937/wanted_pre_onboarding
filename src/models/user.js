const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

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

module.exports = User;