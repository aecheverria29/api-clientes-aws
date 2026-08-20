----------------------------------------------------------------
npm install express cors dotenv mysql2 multer @aws-sdk/client-s3
----------------------------------------------------------------
express: El framework para crear el servidor y las rutas web (el núcleo de la app).
cors: Permite que un frontend (HTML/JS) se conecte a tu servidor.
dotenv: Para leer variables de entorno (claves secretas, contraseñas) sin dejarlas expuestas en el código.  
mysql2: El conector para comunicarnos con la base de datos relacional mediante consultas SQL.
multer: Permite interceptar y procesar archivos enviados desde un formulario (necesario antes de subir a S3).
@aws-sdk/client-s3: El SDK oficial de AWS para subir, listar y descargar archivos a Amazon S3.  

