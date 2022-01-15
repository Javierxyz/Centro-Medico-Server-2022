const { response, request } = require("express");
const pool = require("../database");
const { joinTablaMedicina } = require("../helpers/queries");

const obtenerCitasMedicaPorRutFecha = async (req = request, res = response) => {
  const { id_medico, fecha } = req.params;
  try {
    const consulta = await joinTablaMedicina(id_medico, fecha);
    const citasBD = await pool.query(consulta);
    return res.json(citasBD);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener consulta por id médico y fecha",
      error,
    });
  }
};

const buscarDiagnosticoCIE = async (req = request, res = response) => {
  const { termino_busqueda } = req.params;
  try {
    const diagnosticosDB = await pool.query(
      `SELECT dc.descripcion as nombre FROM diagnosticoscie10 dc WHERE dc.descripcion LIKE '%${termino_busqueda}%'`
    );
    console.log(diagnosticosDB);
    return res.json(diagnosticosDB);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al realizar la búsqueda del término",
      error,
    });
  }
};
module.exports = {
  obtenerCitasMedicaPorRutFecha,
  buscarDiagnosticoCIE,
};
