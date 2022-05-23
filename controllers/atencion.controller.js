const { response, request } = require('express');
const connection = require('../database/config.db');
const { emailExiste } = require('../helpers/db-validator');

const pacienteGet = (req = request, res = response) => {
    connection.query('SELECT * FROM persona WHERE activo = 1', (error, results, fields) => {
        if (error) {
            console.log({ error });
        }
        if (results) {

            return res.json(results)
        }
        //   console.log({fields});
    });
    //la instruccion de termino de la conección genera error al realizar dos veces la consulta
    // connection.end(); 

}


const pacienteoPost = (req = request, res = response) => {
    const { nombre, apellido, email, telefono } = req.body;
    const post = {
        nombre,
        apellido,
        email,
        telefono
    }
    
    
    connection.query('SELECT * from test.persona WHERE email=?', email, (error, results, fields) => {
        // if (error) throw error;
        console.log('este es el error select');
        if (error) {
            return new error;
        }

        if (results[0]?.id_persona) {
            return res.status(400).json({
                msg: 'ya existe el usuario'
            });
        }
        

    });
    
    connection.query('INSERT INTO test.persona SET ?', post, (error, results, fields) => {
        if (error) {
            console.log('este es el error insert');
            console.log({ error });
        }
        if (results) {
            return res.json(results)
        }
        // connection.end();
    })
}


const pacientePut = (req = request, res = response) => {
    const id = req.params.id; //es el parametro que llega desde la petición
    const {nombre, apellido, email, telefono} = req.body;//el cuerpo que llega desde la petición.
    const put = {
        nombre,
        apellido,
        email,
        telefono
    }
    console.log(put);//mostrar por consola / show console
    connection.query(`UPDATE test.persona SET ? WHERE id_persona = ${id}`, [put]), (error, results, fields) => {
        if (error) {
            console.log({ error });
        }
        if (results) {
            return res.json(results);
        }
        // connection.end();
    }
    res.json({
        msg: 'Paciente Actualizado'
    })
}
const pacienteDeleteEver = (req = request, res = response) => {
    /**Capturar el id que viene desde desde la request */
    const id  = req.params.id;
    console.log(id); // Solo para mostrar pro consola lo que llgo para eliminar

    connection.query(`DELETE FROM test.persona WHERE id_persona = ${id}`), (error, results, fields) => {
        if (error) {
            console.log({ error });
        }
        if (results) {
            return res.json(results);
        }
        // connection.end();
    }
    res.json({
        msg: 'Paciente borrado'
    })
}
const pacienteDelete = (req = request, res = response) => {
    /**Capturar el id que viene desde desde la request */
    const id  = req.params.id;
    const activ = {activo:0}
    console.log(id); // Solo para mostrar pro consola lo que llgo para eliminar

    connection.query(`UPDATE test.persona SET ? WHERE id_persona = ${id}`,activ), (error, results, fields) => {
        if (error) {
            console.log({ error });
        }
        if (results) {
            return res.json(results);
        }
        // connection.end();
    }
    res.json({
        msg: 'Paciente borrado'
    })
}

module.exports = {
    pacienteGet,
    pacientePut,
    pacienteoPost,
    pacienteDelete,
    pacienteDeleteEver
}