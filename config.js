//aqui irian las configuraciones del servidor
exports.config = {
    port: process.env.PORT || 5000,
    db_url: process.env.DB_URL || 'mongodb+srv://motorkai:Marianoromero123@cluster0.fredy.mongodb.net/'
}