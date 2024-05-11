const express = require('express') //importo express
const { obtenerLista } = require('../controllers/entidad.controller') //importo los controladores de la ruta
const router = express.Router()

//aqui definiriamos todas las rutas de mi entidad
router.get('/lista', obtenerLista)

module.exports = router //exporto el router