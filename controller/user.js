module.exports = (function(){
    'use strict'
    // Cargamos los modelos para usarlos posteriormente
    var User = require('../model/user');

    // Conseguir datos de un usuario
    var get = function(req, res){
        var userId = req.params.id;

        //buscar un documento por un  id
        User.findById(userId, (err, user) => {
            if(err) return res.status(500).send({message: 'Error en la petición'});
            if(!user) return res.status(404).send({message: 'EL usuario no existe'});
            return res.status(200).send({user});
        });
    }

    /**
     * Metodo para crear un usuario
     * @param {*} req 
     * @param {*} res 
     */
    var post = function (req, res) {
        var userData;
        try{
            userData = JSON.parse(req.body.data);
            User.insertMany([userData])
            .then(result => {
                res.status(200).jsonp(result)
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err})
            });
        }
        catch(err){
            res.status(500).send({"error": "Error al crear el usuario. " + err});
        };

    }

    var put = function(req, res){
        var userId = req.params.id;
        var userData;
        try {
            
            userData = JSON.parse(req.body.data);
            User.updateOne({_id: userId}, userData)
            .then(result => {
                res.status(200).jsonp(result);
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err});
            });

        } catch (error) {
            res.status(500).send({"error": "Error al crear el usuario. " + error});
        }
    }

    var del = function(req, res){
        var userId = req.params.id;
        try {
            User.deleteOne({_id: userId})
            .then(result => {

                var response = {
                    "msj": "No se logro eliminar el registro."
                };
                if(result.deletedCount > 0 && result.ok === 1)
                    response = {
                        "msj": "El registro fue eliminado correctamente."
                    }

                res.status(200).jsonp(response);
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err});
            });

        } catch (error) {
            res.status(500).send({"error": "Error al borrar el usuario. " + error});
        }
    }

    /**
     * Metodo encargado de actualizar parcialmente el usuario
     * @param {*} req 
     * @param {*} res 
     */
    var patch = function(req, res){
        var userId = req.params.id;
        var patchData;
        try {
            
            patchData = JSON.parse(req.body.data);
            User.update({_id: userId}, {$set: patchData})
            .then(result => {
                res.status(200).jsonp(result);
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err});
            });

        } catch (error) {
            res.status(500).send({"error": "Error al crear el usuario. " + error});
        }

    }



    //Api publica
    return{    
        get:get,
        post: post,
        patch: patch,
        put: put,
        del: del
    }
})();