# api-patinetas

API-Rest para proyecto de patinetas electricas

API Deploy: http://45.77.166.213:3800/api

Rutas

 * Creacion de un usuario
 * Metodo: POST
 * Ejemplo: http://45.77.166.213:3800/api/user
 * Cuerpo (Body): 
 * {
 *  data:  {
 *    "name": "Johana Gómez", "lastname":"Colorado"
 *  }
 * }
 * Nota: En POSTMAN, pestaña [Body] agregar key [data] ---> value [{"name": "Johana Gómez", "lastname":"Colorado"}]
 
/user



 * Obtener un usuario
 * Metodo: GET
 * Ejemplo: http://45.77.166.213:3800/api/user/5d74542f4091740a306caa61

/user/:id


 * Actualizar parcialmente un usuario, es decir, permite actualizar 1 propiedad o mas del usuario
 * Metodo: PATCH
 * Ejemplo: http://localhost:3800/api/user/5d74542f4091740a306caa61
 * Body: {data {"lastname": "sin apellido"}}

/user/:id


 * Actualizar totalmente el registro del usuario
 * Metodo: PUT
 * Ejemplo: Ejemplo: http://45.77.166.213:3800/api/user/5d74542f4091740a306caa61
 * Body: {data {"name": "Joha", "lastname": "gome", ...n propiedades}}

/user/:id


 * Borrar un usuario
 * Metodo: DELETE
 * Ejemplo:  http://45.77.166.213:3800/api/user/5d74542f4091740a306caa61

/user/:id


* Metodos para SkateBoards o patinetas 
* Al igual que los metodos de User se debe de enviar un body en el caso de POST, PUT y PATCH

* Crear patineta
  * Metodo: POST
  * Ejemplo: http://45.77.166.213:3800/api/skateBoard

/skateBoard


 * Get
/skateBoard/:id


 * Put
/skateBoard/:id


 * Patch
/skateBoard/:id


 * Delete
/skateBoard/:id


 * Metodos de renta
 * Ejemplo: http://45.77.166.213:3800/api/skateBoard/5d7459624091740a306caa62/rent
 * Body:  {"id_user": "5d74542f4091740a306caa61"}
 * Este endpoint asigna una patineta a un usuario (id_user enviado en el body)

/skateBoard/:id/rent
