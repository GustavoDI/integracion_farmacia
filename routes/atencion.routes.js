const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');


const { pacienteGet,
    pacientePut,
    pacienteoPost,
    pacienteDelete,
    pacienteGetAll,
    pacienteDeleteEver,
    pacienteGetByID } = require('../controllers/atencion.controller');
const { validarCampos } = require('../middlewares/validar-campos');

// router.get('/',  (req, res)=> {
//     // res.send('Buena cabros Tenemos casi ready el rest server de farmacia');
//     res.json({
//         msg: 'Buena cabros Tenemos casi ready el rest server de farmacia'
//     })
// });

// router.put('/', (req, res)=>{
//     res.json({
//         msg:'put'
//     })
// });

router.get('/active-users', pacienteGet);
router.get('/user/:id', pacienteGetByID);
router.get('/users', pacienteGetAll);

router.post('/user', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({ min: 3 }),
    body('apellido', 'El apellido es obligatorio').not().isEmpty().isLength({ min: 3 }),
    body('email', 'El email no es valido').isEmail(),
    validarCampos
], pacienteoPost);

router.put('/user/:id', [
    body('nombre', 'El largo minimo es de tres').not().isEmpty().isLength({ min: 3 }),
    body('apellido', 'El largo minimo es de 3').not().isEmpty().isLength({ min: 3 }),
    body('email', 'El email debe ser valido').isEmail(),
    validarCampos
], pacientePut)

/**Aqui deberia recibir el id del paciente /delete:id */
router.delete('/delete/user/:id', pacienteDelete)
router.delete('/delete-ever/user/:id', pacienteDeleteEver)


router.get('*', (req, res) => {
    res.send('404 | Pagina no encontrada');
});


module.exports = router;
