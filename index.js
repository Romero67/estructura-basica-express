const express = require('express') //importo express
const cors = require('cors') //importo cors
const router = require('./routes/entidad.route') //importo mi router con las rutas definidas de mi entidad
const { config } = require('./config') //importo mi configuracion
const morgan = require('morgan')
const app = express() //creo mi app
const mongoose = require('mongoose')
const path = require('path');
const rateLimit = require('express-rate-limit')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// app.use(limiter)

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