const {ModelTarea} = require('../models/tarea.model')

//funcion controladora que devuelve la lista de entidades
exports.obtenerLista = async (req, res) => {
    try {

        const tareas = await ModelTarea.find({borrado: false})

        return res.status(200).send({ success: true, data: tareas });

    } catch (error) {
        console.log("[obtenerLista] Error fatal: ", error);
        return res.status(500).send({ success: false, message: "Error en el servidor" });
    }
};

exports.crearTarea =  async (request, response) => {
    //aqui va la lógica de agregar la entidad al array (listaEntidades)
    //obtener datos del body - OK
    //creen un objeto en base a esos datos - OK
    //guardar el objeto en el array (listaEntidades) - OK

    try {
        console.log('creando tarea: ',req.ip)
        const { titulo, descripcion } = request.body

        if(!titulo || !descripcion){
            return response.status(400).send({ success: false, message: 'Faltan datos'})
        }

        const nuevaTarea = new ModelTarea({
            borrado: false,
            titulo: titulo,
            descripcion: descripcion,
            hecho: false
        })

        await nuevaTarea.save()

        return response.status(200).send({ success: true, data: "Tarea Creada!" });
    } catch (error) {
        console.log("error servidor: ",error)
        return response.status(500).send({ success: false, message: "Error en el servidor" });
    }
};

exports.eliminarTarea = async (request, response) => {

    try {
        console.log('eliminando tarea: ',req.ip)
        const { id } = request.params

        const query = {_id: id}
        const update = {borrado: true}

        await ModelTarea.updateOne(query, update)

        return response.status(200).send({succes: true, message: `tarea con id: ${id}, eliminada`});
    } catch (error) {
        return response.status(500).send({ success: false, message: "Error en el servidor" });
    }
};

//TODO: ACTUALIZAR TAREA
exports.actualizarTarea = async (request, response) => {
    try {
        console.log('actualizando tarea: ',req.ip)
        const {id} = request.params

        const { titulo, descripcion, hecho } = request.body
        const query = {_id: id}
        const update = {}

        if(titulo) update.titulo = titulo
        if(descripcion) update.descripcion = descripcion
        if(hecho || hecho === false) update.hecho = hecho

        await ModelTarea.updateOne(query, update)

        return response.status(200).send({success: true, message: 'Tarea actualizada!'})

    } catch (error) {
        console.log("error servidor: ",error)
        return response.status(500).send({ success: false, message: "Error en el servidor" });
    }

}