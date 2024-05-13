const express = require('express') //importo express
const { obtenerLista, crearTarea, eliminarTarea } = require('../controllers/entidad.controller') //importo los controladores de la ruta
const router = express.Router()

//aqui definiriamos todas las rutas de mi entidad
router.get('/lista', obtenerLista)
router.post('/crear', crearTarea)
router.patch('/eliminar/:id', eliminarTarea)

module.exports = router //exporto el router