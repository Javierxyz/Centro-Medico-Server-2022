const { response, request } = require("express");
const pool = require("../database");
const { joinTablaMedicina, joinTablaAtencionUsuarios } = require("../helpers/queries");

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

const crearDiagnostico = async (req = request, res = response) => {
  const { antecedentes, atencion } = req.body;
  /**Transforma en string los array de antecedente */
  antecedentes.morb_ad = antecedentes.morb_ad.toString();
  antecedentes.drogas_ad = antecedentes.drogas_ad.toString();

  /**Trasnforma en string los array de objetos de atención */
  atencion.planest_ad = JSON.stringify(atencion.planest_ad);
  atencion.med_ad = JSON.stringify(atencion.med_ad);
  atencion.intern = JSON.stringify(atencion.intern);
  console.log(atencion);
  try {
    await pool.query("INSERT INTO antecedentes_adultos SET ?", [antecedentes]);
    await pool.query("INSERT INTO atencion_mgeneral SET ?", [atencion]);
    return res.json({
      ok: true,
      msg: "Se ingresaron los antecedentes y atención con éxito",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al ingresar antecedentes o atención",
      error,
    });
  }
};

obtenerAntecedentesPorRut = async (req = request, res = response) => {
  const { id_paciente } = req.params;
  try {
    const antecedentesBD = await pool.query("SELECT * FROM antecedentes_adultos WHERE rut_paciente = ? ORDER BY id_antadultos DESC", id_paciente);
    return res.json(antecedentesBD[0]);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al buscar antecedentes",
      error,
    });
  }
};

obtenerAtencionesPorRut = async (req = request, res = response) => {
  const { id_paciente } = req.params;
  try {
    const consulta = await joinTablaAtencionUsuarios(id_paciente);
    const atencionBD = await pool.query(consulta);
    console.log(atencionBD);
    return res.json(atencionBD);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener las atenciones",
      error,
    });
  }
};

module.exports = {
  obtenerCitasMedicaPorRutFecha,
  buscarDiagnosticoCIE,
  crearDiagnostico,
  obtenerAntecedentesPorRut,
  obtenerAtencionesPorRut,
};

// SELECT am.*, CONCAT(us.nombre," ",us.apellido) nombre_profesional, us.sexo FROM atencion_mgeneral am, usuario us WHERE am.id_doctor = us.rut and am.rut_paciente = ''
