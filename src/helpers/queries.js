/** Reaiza un join entre las tablas consulta, paciente y usuario, para obtener
 * los datos del paciente, profesional y detalles de la cita durante una fecha
 * determinada
 */
const joinDatosTablaCitas = (fecha) => {
  return `
    SELECT id_consulta,CONCAT(p.nombre," ", p.apellido) as "nombre_paciente", p.nombre_social,p.rut, p.telefono, c.edad_paciente, CONCAT(u.nombre," ", u.apellido) as "nombre_profesional",am.valor, c.tipo, c.hora, c.lugar_atencion
    FROM consulta c, paciente p, usuario u, area_medica am
    WHERE (c.id_paciente = p.rut) and (c.id_usuario_atencion = u.rut) and (c.fecha = '${fecha}') and (c.area_medica = am.id)`;
};

const joinDatosFormulario = (fecha, hora, id_lugar) => {
  return `
    SELECT id_consulta,CONCAT(p.nombre," ", p.apellido) as "nombre_paciente", p.nombre_social,p.rut, p.telefono, c.edad_paciente, CONCAT(u.nombre," ", u.apellido) as "nombre_profesional",am.valor, c.tipo, c.hora, c.fecha, c.lugar_atencion
    FROM consulta c, paciente p, usuario u, area_medica am
    WHERE (c.id_paciente = p.rut) and (c.id_usuario_atencion = u.rut) and (c.fecha = '${fecha}') and (c.area_medica = am.id) and (c.hora = '${hora}') and (c.lugar_atencion = '${id_lugar}')`;
};

const joinTablaCitasEstados = (fecha) => {
  return `
    SELECT id_consulta,CONCAT(p.nombre," ", p.apellido) as "nombre_paciente", p.nombre_social,p.rut, p.telefono, c.edad_paciente, CONCAT(u.nombre," ", u.apellido) as "nombre_profesional",am.valor, c.tipo, c.hora, c.lugar_atencion, c.estado
    FROM consulta c, paciente p, usuario u, area_medica am
    WHERE (c.id_paciente = p.rut) and (c.id_usuario_atencion = u.rut) and (c.fecha = '${fecha}') and (c.area_medica = am.id)`;
};
module.exports = {
  joinDatosTablaCitas,
  joinDatosFormulario,
  joinTablaCitasEstados,
};
