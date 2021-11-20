const PROTOCOL="http"
const HOST='localhost'
const PORT = '3000'
const COMUNIDAD = 'comunidad'
const POST = 'post'
const COMENTARIO = 'comentario'
const API = `${PROTOCOL}://${HOST}:${PORT}/api/`

module.exports = {
    DEFAULT_API: API,
    COMENTARIO_API: API + COMENTARIO,
    POST_API: API + POST,
    COMUNIDAD_API: API + COMUNIDAD
}
