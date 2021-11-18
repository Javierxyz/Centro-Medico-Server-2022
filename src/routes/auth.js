const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearUsuario, loginUsuario } = require("../controllers/auth");
const router = express.Router();

/**Crear nuevo usuario*/
router.post(
  "/new",
  [
    check("rut", "El rut es obligarotio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    check("email", "El email es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

/**Login de usuario */
router.post(
  "/",
  [
    check("rut", "El rut es obligatorio").not().isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);
module.exports = router;
