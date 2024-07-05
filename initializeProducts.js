const Product = require('./models/Product');

const products = [
    {
        id: 1,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/393496/01/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 2,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/390028/01/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 3,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/394170/06/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 4,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/389615/05/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 5,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/376855/12/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
    {
        id: 6,
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1536,h_1536/global/108001/01/sv01/fnd/ARG/fmt/png',
        name: 'zapatilla',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        price: 100.20,
    },
];

const initializeProducts = async () => {
    for (const product of products) {
        await Product.findOrCreate({ where: { id: product.id }, defaults: product });
    }
};

module.exports = initializeProducts;
