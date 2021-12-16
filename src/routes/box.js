const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { crearBox, obtenerBoxes } = require("../controllers/box");

router.post(
  "/new",
  [
    check("nombre", "El nombre es obligarotio").not().isEmpty(),
    check("zona", "El rut es obligarotio").not().isEmpty(),
    check("habilitado", "El rut es obligarotio").not().isEmpty(),
    validarCampos,
  ],
  crearBox
);

/**Obtener todos los usuarios registrados */
router.get("/", obtenerBoxes);

module.exports = router;
