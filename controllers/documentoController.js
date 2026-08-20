const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('../config/s3');
require('dotenv').config();

// 1. Subir archivo a S3
const subirDocumento = async (req, res) => {
    try {
        // multer deja el archivo procesado en req.file
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
        }

        const archivo = req.file;
        const nombreArchivo = `${Date.now()}-${archivo.originalname}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: nombreArchivo,
            Body: archivo.buffer,
            ContentType: archivo.mimetype
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        res.status(201).json({ 
            mensaje: 'Archivo subido exitosamente a S3', 
            archivo: nombreArchivo 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al subir el archivo', detalle: error.message });
    }
};

// 2. Consultar archivo de S3 (Generar URL temporal)
const obtenerURLDocumento = async (req, res) => {
    try {
        const { key } = req.params; // El nombre del archivo

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        };

        const command = new GetObjectCommand(params);
        
        // Generamos una URL firmada válida por 1 hora (3600 segundos)
        // Esto cumple con evitar accesos públicos innecesarios al bucket.
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        res.status(200).json({ url_temporal: url });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el archivo', detalle: error.message });
    }
};

module.exports = {
    subirDocumento,
    obtenerURLDocumento
};