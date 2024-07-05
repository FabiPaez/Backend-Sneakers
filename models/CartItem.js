const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ShoppingCart = require('./ShoppingCart');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    shoppingCartId: {
        type: DataTypes.INTEGER,
        references: {
            model: ShoppingCart,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

ShoppingCart.hasMany(CartItem, { foreignKey: 'shoppingCartId' });
CartItem.belongsTo(ShoppingCart, { foreignKey: 'shoppingCartId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartItem;
