const mongoose = require('mongoose')

// mongoose.Types.ObjectId() -> devuelve un _id

const tareaSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => {return new mongoose.Types.ObjectId().toString()}
    },
    borrado: {
        type: Boolean
    },
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    hecho: {
        type: Boolean
    }
})

exports.ModelTarea = mongoose.model('tarea', tareaSchema, 'tarea')