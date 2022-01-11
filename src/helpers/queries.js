/** Reaiza un join entre las tablas consulta, paciente y usuario, para obtener
 * los datos del paciente, profesional y detalles de la cita durante una fecha
 * determinada
 */
const joinDatosTablaCitas = (fecha) => {
  return `
    SELECT id_consulta,CONCAT(p.nombre," ", p.apellido) as "nombre_paciente", p.nombre_social,p.rut, p.telefono, c.edad_paciente, CONCAT(u.nombre," ", u.apellido) as "nombre_profesional",am.valor, c.tipo, c.hora, c.lugar_atencion
    FROM consulta c, pacientes p, usuario u, area_medica am
    WHERE (c.id_paciente = p.rut) and (c.id_usuario_atencion = u.rut) and (c.fecha = '${fecha}') and (c.area_medica = am.id)`;
};

const joinDatosFormulario = (fecha, hora, id_lugar) => {
  return `
    SELECT id_consulta,CONCAT(p.nombre," ", p.apellido) as "nombre_paciente", p.nombre_social,p.rut, p.telefono, c.edad_paciente, CONCAT(u.nombre," ", u.apellido) as "nombre_profesional",am.valor, c.tipo, c.hora, c.fecha, c.lugar_atencion
    FROM consulta c, pacientes p, usuario u, area_medica am
    WHERE (c.id_paciente = p.rut) and (c.id_usuario_atencion = u.rut) and (c.fecha = '${fecha}') and (c.area_medica = am.id) and (c.hora = '${hora}') and (c.lugar_atencion = '${id_lugar}')`;
};

const joinTablaCitasEstados = (fecha) => {
  return `
    SELECT id_consulta,CONCAT(p.nombre," ", p.apellido) as "nombre_paciente", p.nombre_social,p.rut, p.telefono, c.edad_paciente, CONCAT(u.nombre," ", u.apellido) as "nombre_profesional",am.valor, c.tipo, c.hora, c.lugar_atencion, c.estado, c.confirmada 
    FROM consulta c, pacientes p, usuario u, area_medica am
    WHERE (c.id_paciente = p.rut) and (c.id_usuario_atencion = u.rut) and (c.fecha = '${fecha}') and (c.area_medica = am.id)`;
};

const joinTablaSignosVitales = async (fecha, zona) => {
  return `
 SELECT p.rut ,v.id_consulta, CONCAT(p.nombre," ",p.apellido) as "nombre_paciente", p.sexo, p.genero, p.nombre_social, v.edad_paciente, v.valor, v.csv, v.nro_box 
 FROM pacientes p, (
    SELECT c.id_consulta, c.id_paciente, c.edad_paciente, am.valor, c.csv, l.nro_box 
    FROM consulta c, lugar l, area_medica am 
    WHERE c.fecha = '${fecha}' and c.lugar_atencion = l.id_lugar and l.zona = '${zona}' and am.id = c.area_medica and c.estado = "asistida") v 
 WHERE p.rut = v.id_paciente 
 `;
};
module.exports = {
  joinDatosTablaCitas,
  joinDatosFormulario,
  joinTablaCitasEstados,
  joinTablaSignosVitales,
};
