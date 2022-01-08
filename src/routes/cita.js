const express = require("express");
const router = express.Router();

const {
  crearCitas,
  obtenerCitasPorFecha,
  actualizarCitasPorId,
  obtenerCitaPorHorario,
  estadisticaCitas,
  obtenerCitasConEstado,
} = require("../controllers/cita");

/**Crear paciente */
router.post("/new", crearCitas);

/**Obtiene estadísticas básicas del centro médico */
router.get("/estadistica", estadisticaCitas);

/**Actualizar citas por ID */
router.put("/update", actualizarCitasPorId);

/**Obtener citas durante una fecha determinada */
router.get("/:fecha", obtenerCitasPorFecha);

/**Obtener citas durante una fecha determinada */
router.get("/:fecha/estado", obtenerCitasConEstado);

/**Obtiene la cita por hora, fecha e id del Box */
router.get("/:hora/:fecha/:id_lugar", obtenerCitaPorHorario);

module.exports = router;
