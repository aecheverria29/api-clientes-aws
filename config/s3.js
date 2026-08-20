const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Inicializamos el cliente de S3.
// Nota: Cuando despleguemos esto en EC2, AWS tomará las credenciales automáticamente 
// del IAM Role, tal como lo exige el requerimiento de seguridad de la rúbrica.
const s3Client = new S3Client({
    region: process.env.AWS_REGION
});

module.exports = s3Client;