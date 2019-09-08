'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var UserController = require('../controller/user');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middleware/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/user/:id', UserController.get);
api.post("/user", UserController.post);
api.patch("/user/:id", UserController.patch);
api.put("/user/:id", UserController.put);
api.delete("/user/:id", UserController.del);
// Exportamos la configuración
module.exports = api;