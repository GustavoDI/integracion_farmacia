const res = require('express/lib/response');
const connection = require('../database/config.db');


const emailExiste = (email) => {
    connection.query('SELECT * from test.persona WHERE email=?', email, (error, results, fields) => {
        if (error) throw error;

        if (results[0]?.id_persona) {
            return res.status(400).json({
                msg: 'ya existe el usuario'
            });
        }
    });
}

module.exports = {
    emailExiste,
}