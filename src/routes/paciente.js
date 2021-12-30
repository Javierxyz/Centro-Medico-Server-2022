const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { crearPaciente } = require("../controllers/paciente");
router.post("/new", crearPaciente);

module.exports = router;
