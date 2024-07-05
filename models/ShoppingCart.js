const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ShoppingCart = sequelize.define('ShoppingCart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

User.hasOne(ShoppingCart, { foreignKey: 'userId' });
ShoppingCart.belongsTo(User, { foreignKey: 'userId' });

module.exports = ShoppingCart;
