const express = require('express') //importo express
const cors = require('cors') //importo cors
const router = require('./routes/entidad.route') //importo mi router con las rutas definidas de mi entidad
const { config } = require('./config') //importo mi configuracion
const morgan = require('morgan')
const app = express() //creo mi app
const mongoose = require('mongoose')
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.json()) //para que el servidor pueda leer el body que viene en formato json
app.use(cors()) //para habilitar CORS y que se pueda hacer peticiones desde el navegador
app.use(morgan('dev')) //para que muestre en consola información de la petición

//aqui van las rutas
app.use('/tarea', router)
app.use('/', (request, response) => {
    response.render('index', { title: 'Hey', message: 'Hello there!' });
})


//conexión a la db
mongoose.connect(config.db_url).then(() => console.log("Conexión con db exitosa"))
.catch((e) => console.log("error con DB: ",e))


//app escuchando el puerto
app.listen(config.port, () => console.log('Servidor escuchando puerto 5000'))