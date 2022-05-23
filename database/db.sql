CREATE DATABASE database_nombre;

USE database_nombre;

CREATE TABLE pacientes (
    idpaciente int not null primary key auto_increment,
    rut varchar(10),
    nombre varchar(50),
    apellidos varchar(50),
    isdeleted bool
);

alter table pacientes
    add primary key (idpaciente);


module.exports