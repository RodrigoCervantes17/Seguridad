En este repo puedes encontrar una api con funcionalidades de login y register, hasheando contraseñas para hacerlo mas seguro.
El primer paso es har tu npm i sobre tu carpeta principal

> npm install

Despues creas tu archivo .env que va a contener los datos para acceder a tu base de datos este es un ejemplo de este

> DB_HOST=localhost
> DB_USER=tuUsuario
> DB_PASSWORD=tuContrasena
> DB_NAME=login

Para la base de datos puedes cambiar los nombre de esta y de la tabla asi como los campos, el ejemplo usado en este repo es algo como esto 
```
CREATE TABLE usuarios (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    contraseña VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,  -- Almacenaremos la contraseña hasheada
    estado_activo BOOLEAN DEFAULT 1,  -- 1 para activo, 0 para inactivo
    estado_admin BOOLEAN DEFAULT 0,  -- 1 para admin, 0 para usuario
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Los campos de la base de datos son:
```
id
nombre
contraseña
estado_activo
estado_admin
fecha_registro
```
Una vez todo configurado tendrias que realizar un 
> cd src
seguido de un
> npm start
y ya tendrias tu servidor corriendo localmente.
