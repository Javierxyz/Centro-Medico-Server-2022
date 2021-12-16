const { response, request } = require("express");
const pool = require("../database");

/**
 * Función que permite ingresar un nuevo box en la base de datos.
 */
const crearBox = async (req = request, res = response) => {
  const { nombre, zona, etiquetasUso, habilitado } = req.body;
  const nuevoBox = { nro_box: nombre, zona, uso: etiquetasUso, habilitado };
  console.log(nuevoBox);
  try {
    await pool.query("INSERT INTO lugar SET ?", [nuevoBox]);
    return res.json({
      ok: true,
      msg: "Box creado de forma satisfactoria",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Algo salió mal en la creación del box",
      error,
    });
  }
};

/**
 * Obtener información de los box ingresados al sistema
 */
const obtenerBoxes = async (req = request, res = response) => {
  try {
    const boxDB = await pool.query("SELECT * FROM lugar");
    console.log(boxDB);
    return res.status(200).json(boxDB);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  crearBox,
  obtenerBoxes,
};
