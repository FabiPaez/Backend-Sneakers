// require('dotenv').config({ path: './credenciales.env' });

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const initializeProducts = require('./initializeProducts');
// const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);

// // Permitir solicitudes desde tu dominio de GitHub Pages
// const corsOptions = {
//     origin: 'https://fabipaez.github.io',
//     optionsSuccessStatus: 200
//   };
  
//   app.use(cors(corsOptions));

// const startServer = async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Database synchronized');
//         await initializeProducts(); // Inicializar los productos
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     } catch (err) {
//         console.error('Unable to connect to the database:', err);
//     }
// };

// startServer();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'mp84y4tzz6dxpj2l',
    'r2x4kbd8hvya2vw1',
    'k7pfqbukmx897f4z',
    {
        host: 'h2cwrn74535xdazj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mysql',
        port: 3306
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
