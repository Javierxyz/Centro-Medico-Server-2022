const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearUsuario, loginUsuario, revalidarToken, obtenerUsuarios } = require("../controllers/usuario");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = express.Router();

/**Crear nuevo usuario*/
router.post(
  "/new",
  [
    check("rut", "El rut es obligarotio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("nacimiento", "El email es obligatorio").not().isEmpty(),
    check("telefono", "El email es obligatorio").not().isEmpty(),
    check("correo_electronico", "El email es obligatorio").not().isEmpty(),
    check("sexo", "El email es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

/**Login de usuario */
router.post(
  "/",
  [check("rut", "El rut es obligatorio").not().isEmail(), check("clave", "La contraseña es obligatoria").isLength({ min: 6 }), validarCampos],
  loginUsuario
);

/**Renovar el token del usuario */
router.get("/renew", validarJWT, revalidarToken);
module.exports = router;

/**Obtener todos los usuarios registrados */
router.get("/", obtenerUsuarios);
