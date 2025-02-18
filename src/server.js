const express = require('express');
const path = require('path');
const authRoutes = require('./auth');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rutas
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));