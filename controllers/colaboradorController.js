var Colaborador = require('../models/colaborador');
var Productos = require('../models/productos');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');


//Registro Colaborador
const registro_colaborador_admin = async function (req, res) {


    // if (req.user) {

    //     console.log(tken_valido);
    // } else {
    //     res.status(500).send({
    //         message: 'NoAcces'
    //     })
    // }

    let data = req.body;
    var colaborador_arr = [];

    colaborador_arr = await Colaborador.find({
        email: data.email
    });

    try {
        if (colaborador_arr.length == 0) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    data.fullname = data.nombres + ' ' + data.apellidos;
                    data.password = hash;
                    let colaborador = await Colaborador.create(data);
                    res.status(200).send({
                        data: colaborador
                    });
                } else {
                    res.status(200).send({
                        message: 'ErrorServer',
                        data: undefined
                    });
                }
            })
        } else {
            res.status(400).send({
                data: undefined,
                message: 'Error, el correo ya existe'
            });

        }




    } catch (error) {
        res.status(400).send({
            data: undefined,
            message: error
        });

    }



}

const registro_productos_admin = async function (req, res) {

    let data = req.body;
    var colaborador_arr = [];

    colaborador_arr = await Colaborador.find({
        email: data.email
    });

    try {
        if (colaborador_arr.length == 0) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {

                    data.password = hash;
                    let colaborador = await Productos.create(data);
                    res.status(200).send({
                        data: colaborador
                    });
                } else {
                    res.status(200).send({
                        message: 'ErrorServer',
                        data: undefined
                    });
                }
            })
        } else {
            res.status(400).send({
                data: undefined,
                message: 'Error, el correo ya existe'
            });

        }


    } catch (error) {
        res.status(400).send({
            data: undefined,
            message: error
        });

    }



}

//Login
const login_admin = async function (req, res) {
    var data = req.body;
    console.log(data);

    var admin_arr = [];

    admin_arr = await Colaborador.find({
        email: data.email
    });

    if (admin_arr.length == 0) {
        res.status(200).send({
            message: 'El correo electrónico no existe',
            data: undefined
        });
    } else {

        let user = admin_arr[0];
        bcrypt.compare(data.password, user.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({
                    message: 'Las credenciales no coinciden',
                    data: undefined
                });
            }
        });

    }
}

//Get listas
const lista_colaboradores_admin = async function (req, res) {
    let colaboradores = await Colaborador.find();
    res.status(200).send({
        data: colaboradores
    })

}

const obtener_datos_colaborador_admin = async function (req, res) {
    console.log('ingresion');
    if (req.user) {
        let id = req.params['id'];

        console.log('id:', id);
        let colaborador = await Colaborador.findById({
            _id: id
        });
        res.status(200).send({
            data: colaborador
        })

    } else {
        res.status(403).send({
            data: undefined,
            message: 'No Tocken'
        });
    }
}

// Update
const editar_colaborador_admin = async function (req, res) {

    if (req.user) {
        let id = req.params['id'];
        let data = req.body;

        let colaborador = await Colaborador.findByIdAndUpdate({
            _id: id
        }, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            genero: data.genero,
            email: data.email,
            telefono: data.telefono,
            n_doc: data.n_doc,
            pais: data.pais,
            rol: data.rol,

        })
        res.status(200).send({
            data: colaborador,

        });


    } else {
        res.status(400).send({
            data: undefined,
            message: 'NoToken'
        });
    }

}

//Eliminar
const eliminar_colaborador_admin = async function (req, res) {
    try {
        if (req.user) {
            var id = req.params['id'];
            let reg = await Colaborador.findOneAndDelete({
                _id: id
            });

            if (reg) {
                res.status(200).send({
                    data: reg
                });
            } else {
                res.status(404).send({
                    message: 'ColaboradorNotFound'
                });
            }
        } else {
            res.status(403).send({
                message: 'NoAccess'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'ServerError'
        });
    }
}


module.exports = {
    registro_colaborador_admin,
    login_admin,
    lista_colaboradores_admin,
    obtener_datos_colaborador_admin,
    editar_colaborador_admin,
    eliminar_colaborador_admin,
    registro_productos_admin
}