const db = require('../db');

// 1. Registrar información (POST)
const registrarCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;
        const [result] = await db.query(
            'INSERT INTO Clientes (nombre, correo, telefono) VALUES (?, ?, ?)',
            [nombre, correo, telefono]
        );
        res.status(201).json({ id: result.insertId, mensaje: 'Cliente registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar cliente', detalle: error.message });
    }
};

// 2. Consultar información y 5. Realizar búsquedas (GET)
const consultarClientes = async (req, res) => {
    try {
        const { busqueda } = req.query; // Para capturar parámetros en la URL como ?busqueda=Juan
        
        let query = 'SELECT * FROM Clientes';
        let valores = [];

        if (busqueda) {
            query += ' WHERE nombre LIKE ? OR correo LIKE ?';
            valores = [`%${busqueda}%`, `%${busqueda}%`];
        }

        const [rows] = await db.query(query, valores);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar clientes', detalle: error.message });
    }
};

// 3. Modificar información (PUT)
const modificarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono } = req.body;
        
        const [result] = await db.query(
            'UPDATE Clientes SET nombre = ?, correo = ?, telefono = ? WHERE id = ?',
            [nombre, correo, telefono, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar cliente', detalle: error.message });
    }
};

// 4. Eliminar información (DELETE)
const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM Clientes WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente', detalle: error.message });
    }
};

module.exports = {
    registrarCliente,
    consultarClientes,
    modificarCliente,
    eliminarCliente
};