const express = require('express');
const cors = require('cors');
const os = require('os'); // NUEVO: Para obtener el nombre del servidor
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// NUEVO: Le decimos a Node que sirva los archivos estáticos de la carpeta 'public'
app.use(express.static('public'));

// Rutas de la API
const clienteRoutes = require('./routes/clienteRoutes');
const documentoRoutes = require('./routes/documentoRoutes');

app.use('/api/clientes', clienteRoutes);
app.use('/api/documentos', documentoRoutes);

// MODIFICADO: Endpoint de estado para que devuelva el nombre de la máquina
app.get('/api/health', (req, res) => {
    res.json({ 
        estado: 'Servidor funcionando', 
        instancia: os.hostname() // Esto mostrará la IP o ID de la EC2 en AWS
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});