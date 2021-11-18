const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../database");
const { generarJWT } = require("../helpers/jwt");

/**Función que permite ingresar un nuevo usuario en la base de datos.
 * Verifica si el usuario ya está registrado en la base de datos.
 * Cifra la contraseña en la base de datos, utilizando bcrypt.
 */
const crearUsuario = async (req = request, res = response) => {
  const { rut, nombre, apellido, rol, password, email } = req.body;
  const nuevoUsuario = { rut, nombre, apellido, rol, password, email };
  try {
    const usuarioDB = await pool.query("SELECT * FROM usuarios WHERE rut = ?", [nuevoUsuario.rut]);
    if (usuarioDB[0] === undefined) {
      try {
        const salt = bcrypt.genSaltSync();
        nuevoUsuario.password = bcrypt.hashSync(password, salt);
        await pool.query("INSERT INTO usuarios SET ?", [nuevoUsuario]);
        return res.json({
          ok: true,
          msg: "Usuario creado de forma satisfactoria.",
        });
      } catch (error) {
        return res.status(500).json({
          ok: false,
          msg: "Algo salió mal en la creación del usuario",
          error,
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya está registrado en el base de datos.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Algo salió mal en la búsqueda del usuario",
      error,
    });
  }
};

/**Función que maneja el ingreso de usuarios al sistema.
 * Verifica si el usuario existe en el sistema y si la contraseña
 * enviada es la correcta utilizando bcrypt.
 */
/** TODO: Cambiar los mensajes de error :p */
const loginUsuario = async (req = request, res = response) => {
  const { rut, password } = req.body;
  try {
    let usuarioDB = await pool.query("SELECT * FROM usuarios WHERE rut = ?", [rut]);
    if (usuarioDB[0] === undefined) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }
    const passwordValida = bcrypt.compareSync(password, usuarioDB[0].password);
    if (!passwordValida) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es la correcta",
      });
    }
    const token = await generarJWT(usuarioDB[0].id, usuarioDB[0].rut);
    return res.json({
      ok: true,
      uid: usuarioDB[0].id,
      nombre: usuarioDB[0].nombre,
      apellido: usuarioDB[0].apellido,
      rol: usuarioDB[0].rol,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Algo salió mal en el ingreso al sistema.",
    });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
};
