var express = require('express');
var colaboradorController = require('../controllers/colaboradorController');
var auth = require('../middlewares/authenticate')

var api = express.Router();

// api.post('/registro_colaborador_admin', auth.auth, colaboradorController.registro_colaborador_admin);
api.post('/registro_colaborador_admin', auth.auth, colaboradorController.registro_colaborador_admin);
api.post('/registro_productos_admin', colaboradorController.registro_productos_admin);
api.post('/login_admin', colaboradorController.login_admin);
api.get('/lista_colaboradores_admin', auth.auth, colaboradorController.lista_colaboradores_admin);
api.get('/obtener_datos_colaborador_admin/:id', auth.auth, colaboradorController.obtener_datos_colaborador_admin);
api.put('/editar_colaborador_admin/:id', auth.auth, colaboradorController.editar_colaborador_admin);
api.delete('/eliminar_colaborador_admin/:id', auth.auth, colaboradorController.eliminar_colaborador_admin);


module.exports = api;