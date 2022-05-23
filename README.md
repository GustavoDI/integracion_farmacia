1.- Creación del RestServer Farmacia
    npm init -y para iniciar el proyecto las configuraciones iniciales
**En est acaso para construir el servidor utilizamos Express 

2.- Instalar Express y requerir la utilización.
    para instalar express debemos realizar npm i express
    npm install express --save

    una vez instalado debemos crear el web server, se debe requerir express 
    para que sea creado el servidor.

    podriamos crear un archivo el cual contenga los datos del servidor y el 
    escucha app.js. Dentro de este archivo se debe agregar los siguientes datos
    
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

    luego nos debemos dirigir a nuestra consola ir a la carpeta de nuestro archivo
    y crear la instacia del servidor
    con nodemon 

3.- Para tener un codigo mas ordenado y con mayor cohesión y escalable separaremos el server 
    creado en el app.js en un nuevo archivo llamado server
    Para ello crearemos una carpeta llamada models el que contendra el server.js

    crear un archivo server.js 
    para poder utilizar el server debemos exportar el modulo, para conseguir exportar debeemos requerir express y crear una clase esta clase la llamaremos Server esta clase contendra un constructor 
    constructor(){

    }
    que inicializar en primera instancia nuestro servidor.
    Dentro del server y el constructor crearemos la instancia de express con utilizaremos this.app dado que esta dentro de la clase esto sera igual a express.
    this.app = express();
    ademas creamos un port que contendra el puerto a travéz del veremos nuestra consultas.
    esto lo realizaremos con variables de entorno para tener un mejor manejo de variables de entorno utilizamos un package de npm llamado dotenv 
    npm install dotenv
    creamos en archivo .env que contendra las variables de entorno 
    esta contendra el PORT = xxxx.
    para utilizar el puerto en nuestro server llamaremos a 
    this.port = process.env.PORT;

4.- Servir archivos estaticos de html

    Para servir archivos estaticos con express utilizaremos la instancia de app y un middleware llamado use( http://expressjs.com/en/starter/static-files.html).

    esto nos obliga a crear un archivo de html el cual estara dentro de una carpeta usalmente llamado public y se debe realizar de la siguiente forma.
    this.app.use(express.static('public'));
    esto nos permite mostrar nuestra pagina web con el html. El siguiente paso es crear las rutas para manejar las páginas.
    
     
5.- Rutas
  Para manejar las rutas en primera instancia crearemos dentro de nuestro server un metodo el cúal contendra 
  las rutas necesarias de nuestros endpoints.
  Al realizar esto desde el server debemos crear un metodo 
  routes () {
    <!-- Aqui va el codigo de las rutas -->
  } 
  Una vez creado el metodo dentro del debemos agregar el codigo para que sea utilizado 
  <!-- req =  request / res = response -->

          this.app.get('/api',  (req, res)=> {
             <!-- Lo que primero sea puesto acá es lo que sera enviado como respuesta -->
              <!-- res.send(''); -->
              <!-- Envío de respuesta en formato json -->
             res.json({
                 msg: 'Algún mensaje'
             })
          });

  Con el servidor arriba probar endpoint 
6.- Escuchador 
  Para escuchar el puerto actual en el cual estamos debemos agregar un metodo listen 
  el cual lleva el puerto 

  listen() {
        this.app.listen(this.port, () => {
            console.log('servidor en puerto ', this.port);
        });

    }

7.- Separar las rutas
  Para separar las rutas crearemos una carpeta y la llamaremos routes 
  dentro de la carpeta crearemos un archivo con el nombre de las rutas, las cuales estaran
  destinados estos endpoints. En este caso farmacia.(farmacia.routes.js)

  En el archivo de farmacia.routes https://expressjs.com/es/guide/routing.html utilizaremos
  el Router metodos .
  const {Router} = require('express');
  const router = Router();
  Posteriomente debemos crear las rutas:
    router.get('/',  (req, res)=> {
     <!-- puede ser esta respuesta o bien un json -->
      // res.send('Respuesta');
      res.json({
          msg: 'Mensaje'
      })
    });

  Para finalmente exportar este modulos de node.
  module.exports = router;
  luego debe ser llamado y utilizado en el server con el middleware use.
  En este caso cambia el nombre del api y debemos requerir desde donde estaremos utilizando 
  el archivo de las rutas.
  this.app.use('/api/farmacia', require('../routes/farmacia.routes'));

8.- Conexión a base datos (https://www.npmjs.com/package/mysql#install)
  en este caso utilizaremos Mysql npm i mysql 

  [
    body('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({min:3}),
    check('apellido', 'El apellido es obligatorio').not().isEmpty().isLength({min:3}),
    body('email', 'El email no es valido').isEmail().trim().normalizeEmail(),
    // check('email', custom(emailExiste))
],



