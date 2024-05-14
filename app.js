'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = express();
var server = require('http').createServer(app);

var test_routes = require('./routers/test');
var colaborador_routes = require('./routers/colaborador');

//Base de datos MOngoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/negocio');
        console.log('Conexión establecida con MongoDB');

        server.listen(port, function () {
            console.log("Puerto :" + port);
        });
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
    }
}

// Llama a la función para conectar con la base de datos
connectToDatabase();


//Evitar errores Cors -res.header- (cabeceres de las peticiones)
app.use(bodyparser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(bodyparser.json({
    limit: '50mb',
    extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});


app.use('/api', test_routes);
app.use('/api', colaborador_routes);



module.exports = app;