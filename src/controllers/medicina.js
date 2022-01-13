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

module.exports = {
  obtenerCitasMedicaPorRutFecha,
};
