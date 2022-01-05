const express = require("express");
const router = express.Router();

const { crearCitas, obtenerCitasPorFecha, actualizarCitasPorId, obtenerCitaPorHorario } = require("../controllers/cita");

/**Crear paciente */
router.post("/new", crearCitas);

/**Obtener citas durante una fecha determinada */
router.get("/:fecha", obtenerCitasPorFecha);

/**Actualizar citas por ID */
router.put("/update", actualizarCitasPorId);

/**Obtiene la cita por hora, fecha e id del Box */
router.get("/:hora/:fecha/:id_lugar", obtenerCitaPorHorario);
module.exports = router;
