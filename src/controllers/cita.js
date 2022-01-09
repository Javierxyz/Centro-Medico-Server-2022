const { response, request } = require("express");
const pool = require("../database");

const { calcularEdad } = require("../helpers/calcular-edad");
const { joinDatosTablaCitas, joinDatosFormulario, joinTablaCitasEstados } = require("../helpers/queries");

const crearCitas = async (req = request, res = response) => {
  const nuevaCita = { ...req.body };
  if (nuevaCita.id_paciente.id_paciente !== undefined) {
    nuevaCita.edad_paciente = calcularEdad(nuevaCita.id_paciente.fecha_nacimiento.slice(0, 10));
    nuevaCita.id_paciente = nuevaCita.id_paciente.rut;
  } else {
    return res.status(500).json({
      ok: false,
      msg: "Seleccione un paciente de la lista",
      error,
    });
  }
  try {
    await pool.query("INSERT INTO consulta SET ?", [nuevaCita]);
    return res.json({
      ok: true,
      msg: "Cita creada de forma satisfactoria.",
      obj: nuevaCita,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Algo salió mal en la creación de la cita",
      error,
    });
  }
};

const obtenerCitasPorFecha = async (req = request, res = response) => {
  const fecha = req.params.fecha;
  console.log(fecha);
  try {
    const consulta = await joinDatosTablaCitas(fecha);
    const citasBD = await pool.query(consulta);
    return res.json(citasBD);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener datos de las citas",
      error,
    });
  }
};

const agendarCitasPorId = async (req = request, res = response) => {
  const { id_consulta, hora, lugar_atencion } = req.body;
  console.log(req.body);
  if (id_consulta === "") {
    return res.status(500).json({
      ok: false,
      msg: "Error, seleccione una cita",
    });
  }
  try {
    await pool.query("UPDATE consulta SET hora = ?, lugar_atencion = ?, estado = 'agendada' WHERE id_consulta = ?", [
      hora,
      lugar_atencion,
      id_consulta,
    ]);
    return res.json({
      ok: true,
      msg: "Cita actualizada con éxito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar la cita",
      error,
    });
  }
};

const obtenerCitaPorHorario = async (req = request, res = response) => {
  const { hora, id_lugar, fecha } = req.params;
  const consulta = joinDatosFormulario(fecha, hora, id_lugar);
  try {
    const citaDB = await pool.query(consulta);
    return res.json(citaDB[0]);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la cita",
      error,
    });
  }
};

const estadisticaCitas = async (req = request, res = response) => {
  try {
    const estadistica = { cantidad_citas: 0, cantidad_paciente: 0 };
    const citasDB = await pool.query("SELECT COUNT(c.id_consulta) 'cantidad_citas' FROM consulta c");
    const pacientesDB = await pool.query("SELECT COUNT(p.id_paciente) 'cantidad_pacientes' FROM paciente p");
    estadistica.cantidad_citas = citasDB[0].cantidad_citas;
    estadistica.cantidad_pacientes = pacientesDB[0].cantidad_pacientes;
    return res.json(estadistica);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener las cantidades",
      error,
    });
  }
};

const obtenerCitasConEstado = async (req = request, res = response) => {
  const fecha = req.params.fecha;
  console.log(fecha);
  try {
    const consulta = await joinTablaCitasEstados(fecha);
    const citasBD = await pool.query(consulta);
    return res.json(citasBD);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener datos de las citas",
      error,
    });
  }
};

const confirmarCita = async (req = request, res = response) => {
  const { id_consulta, confirmada } = req.body;
  console.log(id_consulta, confirmada);
  try {
    await pool.query("UPDATE consulta SET confirmada = ? WHERE id_consulta = ?", [confirmada, id_consulta]);
    return res.json({
      ok: true,
      msg: "Confirmación actualizada de forma satisfactoria.",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al momento de actualizar cita",
      error,
    });
  }
};

const confirmarAsistencia = async (req = request, res = response) => {
  const { id_consulta, estado } = req.body;
  console.log(id_consulta, estado);
  try {
    await pool.query("UPDATE consulta SET estado = ? WHERE id_consulta = ?", [estado, id_consulta]);
    return res.json({
      ok: true,
      msg: "Asistencia actualizada de forma satisfactoria.",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al momento de actualizar cita",
      error,
    });
  }
};
module.exports = {
  crearCitas,
  obtenerCitasPorFecha,
  agendarCitasPorId,
  obtenerCitaPorHorario,
  estadisticaCitas,
  obtenerCitasConEstado,
  confirmarCita,
  confirmarAsistencia,
};
