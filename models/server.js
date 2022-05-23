const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connection = require('../database/config.db');

class Server {

    // creacion del constructor 
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        
        
        this.app.use(express.static('public'));//con este middleware podemos mostrar los contenidos staticos
        this.app.use(express.urlencoded({extended:false}));//middleware analiza entradas con cargas de urlencoded parseando el body
        this.app.use(express.json());//middleware para reconocer en la req como objeto json
        this.app.use(cors());//controlar quien puede tener acceso 

        this.routes();
    }

    /* metodos*/

    middlewares() {

    }

    // rutas
    routes() {

        /**codigo solo de muestra para documentar */
        // this.app.get('/',  (req, res)=> {
        //     // res.send('Buena cabros Tenemos casi ready el rest server de farmacia');
        //     res.json({
        //         msg: 'Buena cabros Tenemos casi ready el rest server de farmacia'
        //     })
        // });

        this.app.use('/api/farmacia', require('../routes/atencion.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor en puerto ', this.port);
        });

    }

}



module.exports = Server;