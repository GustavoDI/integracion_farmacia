const { response, request, results } = require('express');
const connection = require('../database/config.db');

const pacienteGet = (req = request, res = response) => {

    connection.query('SELECT * FROM persona WHERE activo = 1', (error, results, fields) => {
        if (error) {
            return res.status(500).json({
                msg: 'Se ha producido un error al obtener los usuarios'
            })
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

/** 
 * validar solo si el usuario esta activo 
*/
const pacienteGetByID = (req = request, res = response) => {
    const id = parseInt(req.params.id);  //es el parametro que llega desde la petición
    // el tipo de dato que llega del id es string
    // console.log(typeof id);
    connection.query(`select * from test.persona where id_persona = ${id} and activo = 1` , (error, results, fields)=>{
        if (error) {
            res.status(500).json({
                msg: 'Se ha producido un error al obtener los usuarios'
            })
            console.log({ error });
        }
        console.log( results);
        if (!results ) {
            console.log('primer console');
            return res.status(404).json({
                msg:'No existe el usuario'
            });
        }
        if (results) {
            return res.json(results[0]);
        }
    })

}

const pacienteGetAll = (req = request, res = response) => {
    connection.query('SELECT * FROM persona', (error, results, fields) => {
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

        if (error) {
            throw error;
        }

        if (results[0]?.id_persona) {
            return res.status(400).json({
                msg: 'ya existe el usuario'
            });

        } else {
            connection.query('INSERT INTO test.persona SET ?', post, (error, results, fields) => {
                if (error) {
                    console.log('Controlando el error');
                    console.log({ error });
                }
                if (results) {
                    return res.json(results)
                }
                // connection.end();
            });
        }


    });

    // connection.query('INSERT INTO test.persona SET ?', post, (error, results, fields) => {
    //     if (error) {
    //         console.log('este es el error insert');
    //         console.log({ error });
    //     }
    //     if (results) {
    //         return res.json(results)
    //     }
    //     // connection.end();
    // });
}

const pacientePut = (req = request, res = response) => {
    const id = req.params.id; //es el parametro que llega desde la petición
    const { nombre, apellido, email, telefono } = req.body;//el cuerpo que llega desde la petición.
    const put = {
        nombre,
        apellido,
        email,
        telefono
    }
    // console.log(put);//mostrar por consola / show console
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

/**Este controlar borra de manera permanente de la base de datos */
const pacienteDeleteEver = (req = request, res = response) => {
    /**Capturar el id que viene desde desde la request */
    const id = req.params.id;
    console.log(id); // Solo para mostrar pro consola lo que llego para eliminar

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
/**Este controlador cambia el estado del usuario a false para que no sea 
 * visualizado en la obtención de la consulta 
 */
const pacienteDelete = (req = request, res = response) => {
    /**Capturar el id que viene desde desde la request */
    const id = req.params.id;
    const activ = { activo: 0 }
    console.log(id); // Solo para mostrar pro consola lo que llgo para eliminar

    connection.query(`UPDATE test.persona SET ? WHERE id_persona = ${id}`, activ), (error, results, fields) => {
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
    pacienteGetAll,
    pacienteGetByID,
    pacienteoPost,
    pacientePut,
    pacienteDeleteEver,
    pacienteDelete

}