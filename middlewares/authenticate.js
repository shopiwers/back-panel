var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'pragol2021Monithor';

exports.auth = function (req, res, next) {
    console.log('lista_colaboradores_admin:', req.headers);
    console.log('auth:', req.headers.authorization);

    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'NoHeadersError'
        });
    }

    // El token ya está en su forma original, no es necesario eliminar comillas innecesarias
    var token = req.headers.authorization;

    var segment = token.split('.');

    if (segment.length !== 3) {
        return res.status(403).send({
            message: 'InvalidToken'
        });
    } else {
        try {
            var payload = jwt.decode(token, secret);
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({
                    message: 'TokenExpirado'
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(403).send({
                message: 'ErrorToken'
            });
        }
    }
    console.log('llega');
    req.user = payload;

    next();
}