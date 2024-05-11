//definición de lista de entidades
const listaEntidades = [{
    id: 1,
    borrado: false
    //... aqui van las demás propiedades
}]

//funcion controladora que devuelve la lista de entidades
exports.obtenerLista = (req, res) => {
    try {
        return res.status(200).send({success: true, data: listaEntidades})
    } catch (error) {
        console.log("[obtenerLista] Error fatal: ",error)
        return res.status(500).send({success: false, message: 'Error en el servidor'})
    }
}