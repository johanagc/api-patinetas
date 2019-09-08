'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    id_user: String,
    id_skateboard: String,
    date: Date,
    dateLimit: Date,
    cost: Number,
    state: Number
},{collection: 'SkateRents'});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Rent' , UserSchema, "SkateRents");