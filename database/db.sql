CREATE DATABASE test;

USE test;

CREATE TABLE persona (
    
    id_persona int(11) not null ,
    nombre varchar(45) ,
    apellido varchar(45) ,
    email varchar(45) ,
    telefono varchar(45) ,
    activo tinyint(1)
);

alter table persona
    add primary key (id_persona);


module.exports