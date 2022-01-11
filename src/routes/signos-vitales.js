const express = require("express");
const router = express.Router();

const { crearSignosVitales, obtenerSignosVitales } = require("../controllers/signos-vitales");

router.post("/new", crearSignosVitales);

router.get("/:id_consulta", obtenerSignosVitales);
module.exports = router;
