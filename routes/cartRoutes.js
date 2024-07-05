const express = require('express');
const router = express.Router();
const { ShoppingCart, CartItem, Product } = require('../models');

// Obtener o crear un carrito
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId || null;
        let shoppingCart;

        if (userId && userId !== 'null') {
            [shoppingCart] = await ShoppingCart.findOrCreate({ where: { userId } });
        } else {
            // Buscar un carrito no asociado a un usuario
            shoppingCart = await ShoppingCart.findOne({ where: { userId: null } });
            if (!shoppingCart) {
                // Si no se encuentra un carrito, crear uno nuevo
                shoppingCart = await ShoppingCart.create({ userId: null, total: 0 });
            }
        }

        res.json(shoppingCart);
    } catch (error) {
        console.error('Error in GET /api/cart:', error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener items del carrito
router.get('/:cartId/items', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cartItems = await CartItem.findAll({
            where: { shoppingCartId: cartId },
            include: [Product]
        });

        const formattedCartItems = cartItems.map(item => ({
            id: item.id,
            product: {
                image: item.Product.image,
                price: item.Product.price
            },
            quantity: item.quantity,
            subTotal: item.quantity * item.Product.price
        }));

        res.json(formattedCartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: error.message });
    }
});

// Agregar item al carrito
router.post('/:cartId/items', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const { productId, quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const [cartItem, created] = await CartItem.findOrCreate({
            where: { shoppingCartId: cartId, productId },
            defaults: { quantity }
        });

        if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        res.json(cartItem);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar item del carrito
router.delete('/:cartId/items/:itemId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const itemId = req.params.itemId;

        await CartItem.destroy({ where: { id: itemId, shoppingCartId: cartId } });
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: error.message });
    }
});

// Incrementar cantidad de un item
router.put('/items/:itemId/increment', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        const cartItem = await CartItem.findByPk(itemId);
        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
            res.json(cartItem);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error incrementing product quantity:', error);
        res.status(500).json({ error: error.message });
    }
});

// Disminuir cantidad de un item
router.put('/items/:itemId/decrease', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        const cartItem = await CartItem.findByPk(itemId);
        if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            res.json(cartItem);
        } else if (cartItem) {
            await cartItem.destroy();
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error decreasing product quantity:', error);
        res.status(500).json({ error: error.message });
    }
});

// Vaciar carrito
router.delete('/:cartId/items', async (req, res) => {
    try {
        await CartItem.destroy({ where: { shoppingCartId: req.params.cartId } });
        res.json({ message: 'Cart emptied' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
