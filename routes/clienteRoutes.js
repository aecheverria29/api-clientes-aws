const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/', clienteController.registrarCliente); // 1. Registrar información (POST)
router.get('/', clienteController.consultarClientes); // 2. Consultar información y 5. Realizar búsquedas (GET)
router.put('/:id', clienteController.modificarCliente); // 3. Modificar información (PUT)
router.delete('/:id', clienteController.eliminarCliente); // 4. Eliminar información (DELETE)

module.exports = router;

