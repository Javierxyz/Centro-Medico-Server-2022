const express = require("express");
const router = express.Router();

const { obtenerCitasMedicaPorRutFecha, buscarDiagnosticoCIE, crearDiagnostico, obtenerAtencionesPorRut } = require("../controllers/medicina");

router.post("/new", crearDiagnostico);

/**Obtiene las citas asociadas a un profesional de la salud en un día en específico */
router.get("/cita/:id_medico/:fecha", obtenerCitasMedicaPorRutFecha);

router.get("/cie10/:termino_busqueda", buscarDiagnosticoCIE);

router.get("/antecedentes/:id_paciente", obtenerAntecedentesPorRut);

router.get("/atenciones/:id_paciente", obtenerAtencionesPorRut);

module.exports = router;
