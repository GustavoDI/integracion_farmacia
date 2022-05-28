
const { pacienteGet,
    pacienteGetAll,
    pacienteoPost,
    pacientePut,
    pacienteDeleteEver,
    pacienteDelete, 
    pacienteGetByID} = require('../models/paciente.models');

pacienteGet
pacienteGetByID
pacienteGetAll
pacienteoPost
pacientePut
pacienteDeleteEver
pacienteDelete

module.exports = {
    pacienteGet,
    pacienteGetAll,
    pacienteGetByID,
    pacientePut,
    pacienteoPost,
    pacienteDelete,
    pacienteDeleteEver
}