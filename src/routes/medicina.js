const express = require("express");
const router = express.Router();

const { obtenerCitasMedicaPorRutFecha, buscarDiagnosticoCIE } = require("../controllers/medicina");

/**Obtiene las citas asociadas a un profesional de la salud en un día en específico */
router.get("/cita/:id_medico/:fecha", obtenerCitasMedicaPorRutFecha);

router.get("/ficha/:id_paciente");

router.get("/cie10/:termino_busqueda", buscarDiagnosticoCIE);
module.exports = router;
