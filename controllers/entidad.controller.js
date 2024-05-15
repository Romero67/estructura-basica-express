//definición de lista de entidades
const listaEntidades = [
    {
        id: 1, //lo proporciona el servidor
        borrado: false,
        //... aqui van las demás propiedades
        titulo: "estudiar programación", //lo proporciona el front
        descripcion: "Estudiar por la mañana tomando matecitos", //lo proporciona el front
        hecho: false,
    },
    {
        id: 2, //lo proporciona el servidor
        borrado: false,
        //... aqui van las demás propiedades
        titulo: "estudiar programación", //lo proporciona el front
        descripcion: "Estudiar por la mañana tomando matecitos", //lo proporciona el front
        hecho: false,
    },
    {
        id: 3, //lo proporciona el servidor
        borrado: false,
        //... aqui van las demás propiedades
        titulo: "estudiar programación", //lo proporciona el front
        descripcion: "Estudiar por la mañana tomando matecitos", //lo proporciona el front
        hecho: false,
    }
];

//funcion controladora que devuelve la lista de entidades
exports.obtenerLista = (req, res) => {
    try {
        return res.status(200).send({ success: true, data: listaEntidades });
    } catch (error) {
        console.log("[obtenerLista] Error fatal: ", error);
        return res.status(500).send({ success: false, message: "Error en el servidor" });
    }
};

exports.crearTarea = (request, response) => {
    //aqui va la lógica de agregar la entidad al array (listaEntidades)
    //obtener datos del body - OK
    //creen un objeto en base a esos datos - OK
    //guardar el objeto en el array (listaEntidades) - OK

    try {
        const { titulo, descripcion } = request.body

        if(!titulo || !descripcion){
            return response.status(400).send({ success: false, message: 'Faltan datos'})
        }

        const id = listaEntidades.length + 1

        const nuevaTarea = {
            id: id,
            borrado: false,
            titulo: titulo,
            descripcion: descripcion,
            hecho: false
        }

        listaEntidades.push(nuevaTarea)

        return response.status(200).send("tarea creada!");
    } catch (error) {
        console.log("error servidor: ",error)
        return response.status(500).send({ success: false, message: "Error en el servidor" });
    }
};

exports.eliminarTarea = (request, response) => {

    try {
        const { id } = request.params

        listaEntidades.forEach(entidad => {
            if(entidad.id == id){
                entidad.borrado = true
            }
        })

        return response.status(200).send(`tarea con id: ${id}, eliminada`);
    } catch (error) {
        return response.status(500).send({ success: false, message: "Error en el servidor" });
    }
};

//TODO: ACTUALIZAR TAREA
exports.actualizarTarea = (request, response) => {
    try {
        const {id} = request.params

        const { titulo, descripcion, hecho } = request.body

        listaEntidades.forEach(tarea => {
            if(tarea.id == id){
                tarea.titulo = titulo ? titulo : tarea.titulo
                tarea.descripcion = descripcion ? descripcion : tarea.descripcion
                tarea.hecho = hecho ? hecho : tarea.hecho
            }
        })

        return response.status(200).send({success: true, message: 'Tarea actualizada!'})

    } catch (error) {
        console.log("error servidor: ",error)
        return response.status(500).send({ success: false, message: "Error en el servidor" });
    }

}