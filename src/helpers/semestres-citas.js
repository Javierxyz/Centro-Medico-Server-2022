const obtenerCitasPorSemestre = async (fecha) => {
  const semestre = [];
  const consultas = [];
  const fechaTemp = fecha.split("-");
  const mesInt = parseInt(fechaTemp[1]);
  console.log(mesInt);
  if (mesInt <= 6) {
    for (let i = 1; i <= 6; i++) {
      semestre.push({ inicio: `${fechaTemp[0]}-0${i}-01`, fin: `${fechaTemp[0]}-0${i}-31` });
    }
  } else {
    for (let i = 7; i <= 12; i++) {
      if (i < 10) {
        semestre.push({ inicio: `${fechaTemp[0]}-0${i}-01`, fin: `${fechaTemp[0]}-0${i}-31` });
      } else {
        semestre.push({ inicio: `${fechaTemp[0]}-${i}-01`, fin: `${fechaTemp[0]}-${i}-31` });
      }
    }
  }

  semestre.map((mes) => {
    consultas.push(`SELECT COUNT(id_consulta) 'cantidad_cita' FROM consulta WHERE fecha BETWEEN '${mes.inicio}' and '${mes.fin}'`);
  });
  return consultas;
};

module.exports = {
  obtenerCitasPorSemestre,
};
