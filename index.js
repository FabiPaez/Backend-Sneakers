require('dotenv').config({ path: './credenciales.env' });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { User, Product, ShoppingCart, CartItem } = require('./models');
const initializeProducts = require('./initializeProducts');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
  origin: 'https://fabipaez.github.io', // Reemplaza con la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
    
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada');

    app.get('/', (req, res) => {
      res.send('Hello World! This is the root route.');
    });

    await initializeProducts(); // Inicializar los productos

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
  }
};

startServer();
