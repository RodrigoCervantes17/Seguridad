const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./db');

// Registro
router.post('/register', async (req, res) => {
    try {
        const { nombre, contraseña } = req.body;
        const hash = await bcrypt.hash(contraseña, 10);
        
        await db.execute(
            'INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)',
            [nombre, hash]
        );
        
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el registro' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { nombre, contraseña } = req.body;
        const [usuarios] = await db.execute('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        
        if (usuarios.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
        
        const usuario = usuarios[0];
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        
        if (!contraseñaValida) return res.status(401).json({ error: 'Contraseña incorrecta' });
        if (!usuario.estado_activo) return res.status(403).json({ error: 'Usuario inactivo' });

        res.json({ 
            user: {
                id: usuario.id,
                nombre: usuario.nombre,
                estado_admin: usuario.estado_admin,
                estado_activo: usuario.estado_activo
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
});

// Obtener usuarios (solo admin)
router.get('/users', async (req, res) => {
    try {
        const [usuarios] = await db.execute('SELECT id, nombre, estado_activo FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Cambiar estado
router.put('/users/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { estado_activo } = req.body;
        await db.execute('UPDATE usuarios SET estado_activo = ? WHERE id = ?', [estado_activo, id]);
        res.json({ message: 'Estado actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar estado' });
    }
});

module.exports = router;