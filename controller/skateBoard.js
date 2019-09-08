module.exports = (function(){
    'use strict'
    // Cargamos los modelos para usarlos posteriormente
    var skateBoard = require('../model/skateBoard');
    var skateBoardRent = require('../model/skateBoardRent');

    // Conseguir datos 
    var get = function(req, res){
        var skateBoardId = req.params.id;

        //buscar un documento por un  id
        skateBoard.findById(skateBoardId, (err, skateBoard) => {
            if(err) return res.status(500).send({message: 'Error en la petición'});
            if(!skateBoard) return res.status(404).send({message: 'La patineta no existe'});
            return res.status(200).send({skateBoard});
        });
    }

    /**
     * Metodo para crear una patineta
     * @param {*} req 
     * @param {*} res 
     */
    var post = function (req, res) {
        var skateBoardData;
        try{
            skateBoardData = JSON.parse(req.body.data);
            skateBoard.insertMany([skateBoardData])
            .then(result => {
                res.status(200).jsonp(result)
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err})
            });
        }
        catch(err){
            res.status(500).send({"error": "Error al crear la patineta. " + err});
        };

    }

    var put = function(req, res){
        var skateBoardId = req.params.id;
        var skateBoardData;
        try {
            
            skateBoardData = JSON.parse(req.body.data);
            skateBoard.updateOne({_id: skateBoardId}, skateBoardData)
            .then(result => {
                res.status(200).jsonp(result);
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err});
            });

        } catch (error) {
            res.status(500).send({"error": "Error al crear la patineta. " + error});
        }
    }

    var del = function(req, res){
        var skateBoardId = req.params.id;
        try {
            skateBoard.deleteOne({_id: skateBoardId})
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
            res.status(500).send({"error": "Error al borrar la patineta. " + error});
        }
    }

    /**
     * Metodo encargado de actualizar parcialmente  una patineta
     * @param {*} req 
     * @param {*} res 
     */
    var patch = function(req, res){
        var skateBoardId = req.params.id;
        var patchData;
        try {
            
            patchData = JSON.parse(req.body.data);
            skateBoard.update({_id: skateBoardId}, {$set: patchData})
            .then(result => {
                res.status(200).jsonp(result);
            })
            .catch(err => {
                res.status(500).jsonp({"name": "Error interno", "msg": err});
            });

        } catch (error) {
            res.status(500).send({"error": "Error al crear la patineta. " + error});
        }

    }


    var rent = function(req, res){
        var skateBoardId = req.params.id;
        let assignData;
        try {

            // parseamos los datos de la asignacion
            assignData = JSON.parse(req.body.data);

            let date = new Date();
            let dateLimit = new Date();
            dateLimit.setMinutes(dateLimit.getMinutes() + 30);

            let rentObject = {
                "id_user": assignData.id_user,
                "id_skateboard": skateBoardId,
                "date": date,
                "dateLimit": dateLimit,
                "state": 0
            };
            skateBoardRent.insertMany([rentObject])
            .then(result => {
                res.status(200).jsonp(result);
            })
            .catch(error => {
                res.status(500).jsonp({"name": "Error interno", "msg": error});
            });

        } catch (error) {
            res.status(500).send({"error": "Error al asignar la patineta. " + error});
        }

    }

    var getAll = function (req, res) {
        
        //Obtener todas las patinetas
        skateBoard.find()
        .then(result => {
            res.status(200).jsonp(result);
        })
        .catch(err => {
            res.status(500).jsonp({"name": "Error interno", "msg": err});
        });
    }

    //Api publica
    return{    
        get:get,
        post: post,
        patch: patch,
        put: put,
        del: del,
        getAll: getAll,
        rent: rent
    }
})();