const { response, request } = require("express");
const pool = require("../database");

const { calcularEdad } = require("../helpers/calcular-edad");
const { joinDatosTablaCitas, joinDatosFormulario } = require("../helpers/queries");

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

const actualizarCitasPorId = async (req = request, res = response) => {
  const { id_consulta, hora, lugar_atencion } = req.body;
  try {
    await pool.query("UPDATE consulta SET hora = ?, lugar_atencion = ? WHERE id_consulta = ?", [hora, lugar_atencion, id_consulta]);
    return res.json({
      ok: true,
      msg: "Cita actualizada con éxito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar el paciente",
      error,
    });
  }
};

const obtenerCitaPorHorario = async (req = request, res = response) => {
  const { hora, id_lugar, fecha } = req.params;
  const consulta = joinDatosFormulario(fecha, hora, id_lugar);
  try {
    const citaDB = await pool.query(consulta);
    return res.json(citaDB);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener la cita",
      error,
    });
  }
};
module.exports = {
  crearCitas,
  obtenerCitasPorFecha,
  actualizarCitasPorId,
  obtenerCitaPorHorario,
};
