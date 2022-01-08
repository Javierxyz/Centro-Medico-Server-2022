const express = require("express");
const router = express.Router();

const { dashboardDatosTarjetas, citasSemestre } = require("../controllers/estadistica");

/**Obtener datos para el dashboard del administrador */
router.get("/dashboard", dashboardDatosTarjetas);

/**Obtenr la cantidad de citas del último semestre */
router.get("/dashboard/:fecha", citasSemestre);
module.exports = router;
