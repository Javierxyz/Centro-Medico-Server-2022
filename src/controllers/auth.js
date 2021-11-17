const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../database");

const crearUsuario = async (req = request, res = response) => {
  const { rut, nombre, apellido, rol, password, email } = req.body;
  const nuevoUsuario = { rut, nombre, apellido, rol, password, email };
  try {
    let usuarioDB = await pool.query("SELECT * FROM usuarios WHERE rut = ?", [nuevoUsuario.rut]);
    usuarioDB = JSON.stringify(usuarioDB);
    if (usuarioDB !== "[]") {
      console.log("Encontré algo");
    } else {
      console.log("No encontré nada");
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Algo salió mal en la búsqueda del usuario",
    });
  }
};

module.exports = {
  crearUsuario,
};
