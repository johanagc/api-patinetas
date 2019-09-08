'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var skateBoardController = require('../controller/skateBoard');
// Llamamos al router
var api = express.Router();

// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get("/skateBoard", skateBoardController.getAll)
api.get('/skateBoard/:id', skateBoardController.get);
api.post("/skateBoard", skateBoardController.post);
api.patch("/skateBoard/:id", skateBoardController.patch);
api.put("/skateBoard/:id", skateBoardController.put);
api.delete("/skateBoard/:id", skateBoardController.del);

// rutas para asignar patineta

// Asignar una patineta a un usuario
api.post("/skateBoard/:id/rent", skateBoardController.rent);

//

// Exportamos la configuración
module.exports = api;