const express = require('express');
const router = express.Router();
const multer = require('multer');
const documentoController = require('../controllers/documentoController');

// Configurar multer para almacenar el archivo temporalmente en la memoria RAM
const upload = multer({ storage: multer.memoryStorage() });

// Definir los endpoints
// 'documento' es el nombre del campo que deberá llevar el formulario al enviar el archivo
router.post('/subir', upload.single('documento'), documentoController.subirDocumento);
router.get('/:key', documentoController.obtenerURLDocumento);

module.exports = router;