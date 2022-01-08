const { response, request } = require("express");
const pool = require("../database");
const { obtenerCitasPorSemestre } = require("../helpers/semestres-citas");

const dashboardDatosTarjetas = async (req = request, res = response) => {
  try {
    const estadistica = { cantidad_profesionales: 0, cantidad_box: 0, cantidad_citas: 0 };
    const profesionalesBD = await pool.query("SELECT COUNT(profesional) 'cant_pro' FROM usuario_roles WHERE profesional = 1");
    const boxBD = await pool.query("SELECT COUNT(id_lugar) 'cant_box' FROM lugar");
    const citasBD = await pool.query("SELECT COUNT(id_consulta) 'cant_citas' FROM consulta");
    estadistica.cantidad_profesionales = profesionalesBD[0].cant_pro;
    estadistica.cantidad_box = boxBD[0].cant_box;
    estadistica.cantidad_citas = citasBD[0].cant_citas;
    return res.json(estadistica);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener las estadísticas del centro médico",
      error,
    });
  }
};

const citasSemestre = async (req = request, res = response) => {
  const { fecha } = req.params;
  const cantidad = [];
  let bdRes;
  try {
    const mesesQuery = await obtenerCitasPorSemestre(fecha);
    for (let i = 0; i < 6; i++) {
      bdRes = await pool.query(mesesQuery[i]);
      cantidad[i] = bdRes[0];
    }
    return res.json(cantidad);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener los datos",
      error,
    });
  }
  return res.json(mesesQuery);
};
module.exports = {
  dashboardDatosTarjetas,
  citasSemestre,
};
