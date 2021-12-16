const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../database");
const { generarJWT } = require("../helpers/jwt");

/**Función que permite ingresar un nuevo usuario en la base de datos.
 * Verifica si el usuario ya está registrado en la base de datos.
 * Cifra la contraseña en la base de datos, utilizando bcrypt.
 */
const crearUsuario = async (req = request, res = response) => {
  const { rut, nombre, apellido, nacimiento, telefono, correo_electronico, sexo } = req.body;
  console.log(req.body);
  const fecha_nacimiento = new Date(nacimiento.year, nacimiento.month, nacimiento.day);
  const clave = "cm_" + rut.slice(0, rut.length - 2);
  const pin = Math.floor(Math.random() * 90000) + 10000;
  const nuevoUsuario = { rut, nombre, apellido, fecha_nacimiento, telefono, clave, correo_electronico, sexo, pin };

  try {
    const usuarioDB = await pool.query("SELECT * FROM usuario WHERE rut = ?", [nuevoUsuario.rut]);
    if (usuarioDB[0] === undefined) {
      try {
        const salt = bcrypt.genSaltSync();
        nuevoUsuario.clave = bcrypt.hashSync(clave, salt);
        await pool.query("INSERT INTO usuario SET ?", [nuevoUsuario]);
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
  const { rut, clave } = req.body;
  console.log(rut, clave);
  try {
    let usuarioDB = await pool.query("SELECT * FROM usuario WHERE rut = ?", [rut]);
    if (usuarioDB[0] === undefined) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }
    console.log(usuarioDB[0]);
    const passwordValida = bcrypt.compareSync(clave, usuarioDB[0].clave);
    if (!passwordValida) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es la correcta",
      });
    }
    const token = await generarJWT(usuarioDB[0].rut, usuarioDB[0].nombre);
    return res.json({
      ok: true,
      uid: usuarioDB[0].id,
      rut: usuarioDB[0].rut,
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

const revalidarToken = async (req = request, res = response) => {
  const { rut } = req;
  try {
    const usuarioDB = await pool.query("SELECT * FROM usuario WHERE rut = ?", [rut]);
    const token = await generarJWT(rut, usuarioDB[0].nombre);
    return res.json({
      ok: true,
      rut,
      nombre: usuarioDB[0].nombre,
      apellido: usuarioDB[0].apellido,
      rol: usuarioDB[0].rol,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Validación de token: El usuario no se encontró en el sistema.",
    });
  }
};

/**Obtiene algunos datos los usuarios registrodos */
const obtenerUsuarios = async (req = request, res = response) => {
  try {
    const usuariosDB = await pool.query("SELECT nombre, apellido, telefono,correo_electronico FROM usuario");
    console.log(usuariosDB);
    return res.status(200).json(usuariosDB);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  obtenerUsuarios,
};
