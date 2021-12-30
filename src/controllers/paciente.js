const { response, request } = require("express");
const pool = require("../database");

const crearPaciente = async (req = request, res = response) => {
  const nuevoPaciente = { ...req.body };
  console.log(nuevoPaciente);
  const fecha_nacimiento = new Date(nuevoPaciente.fecha_nacimiento.year, nuevoPaciente.fecha_nacimiento.month, nuevoPaciente.fecha_nacimiento.day);
  nuevoPaciente.fecha_nacimiento = fecha_nacimiento;
  try {
    const pacienteBD = await pool.query("SELECT * FROM paciente WHERE rut = ?", [nuevoPaciente.rut]);
    if (pacienteBD[0] === undefined) {
      try {
        await pool.query("INSERT INTO paciente SET ?", [nuevoPaciente]);
        return res.json({
          ok: true,
          msg: "Paciente creado de forma satisfactoria.",
        });
      } catch (error) {
        return res.status(500).json({
          ok: false,
          msg: "Algo salió mal en la creación del paciente",
          error,
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        msg: "El paciente ya está registrado en el base de datos.",
      });
    }
  } catch (error) {}
  return res.json(nuevoPaciente);
};

module.exports = {
  crearPaciente,
};
