const express = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../../middlewares/validar-campos");
const { crearUsuario } = require("../controllers/auth");
const router = express.Router();

router.post(
  "/new",
  [
    check("rut", "El rut es obligarotio").not().isEmpty(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe ser obligatoria").isLength({ min: 6 }),
    check("email", "El email es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

module.exports = router;
