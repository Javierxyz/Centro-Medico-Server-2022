const express = require("express");
const router = express.Router();

const {
  crearCitas,
  obtenerCitasPorFecha,
  agendarCitasPorId,
  obtenerCitaPorHorario,
  estadisticaCitas,
  obtenerCitasConEstado,
  confirmarCita,
  confirmarAsistencia,
} = require("../controllers/cita");

/**Crear paciente */
router.post("/new", crearCitas);

/**Obtiene estadísticas básicas del centro médico */
router.get("/estadistica", estadisticaCitas);

/**Agenda citas por ID en body*/
router.put("/update", agendarCitasPorId);

/**Confirmar cita por ID en body*/
router.put("/confirmar", confirmarCita);

/**Cambia estado desde la recepcion a "Asistida" */
router.put("/asistida", confirmarAsistencia);

/**Obtener citas durante una fecha determinada */
router.get("/:fecha", obtenerCitasPorFecha);

/**Obtener citas durante una fecha determinada */
router.get("/:fecha/estado", obtenerCitasConEstado);

/**Obtiene la cita por hora, fecha e id del Box */
router.get("/:hora/:fecha/:id_lugar", obtenerCitaPorHorario);

module.exports = router;
