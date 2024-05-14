var Productos = require('../models/productos');


const login_admin = async function (req, res) {
    var data = req.body;
    var admin_arr = [];

    admin_arr = await Admin.find({
        email: data.email
    });

    if (admin_arr.length == 0) {
        res.status(200).send({
            message: 'El correo electrónico no existe',
            data: undefined
        });
    } else {
        //LOGIN
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


module.exports = {
    login_admin
}