const materias = [
  { codigo: "118024", nombre: "Morfología I", prerequisitos: [] },
  { codigo: "118028", nombre: "Morfología II", prerequisitos: ["118024"] },
  { codigo: "118025", nombre: "Biología Celular y Molecular I", prerequisitos: [] },
  { codigo: "118029", nombre: "Biología Celular y Molecular II", prerequisitos: ["118025"] },
  { codigo: "118026", nombre: "Biofísica", prerequisitos: [] },
  { codigo: "118047", nombre: "Neuroanatomía Funcional y Neurofisiología", prerequisitos: ["118024"] },
  { codigo: "150136", nombre: "Fisiología", prerequisitos: ["118028", "118029"] },
  { codigo: "150063", nombre: "Patología General", prerequisitos: ["150136"] },
  { codigo: "114018", nombre: "Biomecánica", prerequisitos: ["118024", "118026"] },
  { codigo: "150075", nombre: "Farmacología", prerequisitos: ["150063"] },
  { codigo: "115196", nombre: "Salud y Contexto", prerequisitos: [] },
  { codigo: "115078", nombre: "Promoción de la Salud", prerequisitos: ["115196"] },
  { codigo: "100025", nombre: "Salud Pública y Epidemiología", prerequisitos: ["115078"] },
  { codigo: "115000", nombre: "Planificación en Salud", prerequisitos: ["100025"] },
  { codigo: "115096", nombre: "Políticas Públicas y Seguridad Social", prerequisitos: ["115000"] },
  { codigo: "118027", nombre: "Cuerpo y Movimiento I", prerequisitos: [] },
  { codigo: "118030", nombre: "Cuerpo y Movimiento II", prerequisitos: ["118027"] },
  { codigo: "118031", nombre: "Evaluación y Diagnóstico I", prerequisitos: ["118028", "118030"] },
  { codigo: "118032", nombre: "Evaluación y Diagnóstico II", prerequisitos: ["150136", "118047", "118031"] },
  { codigo: "118033", nombre: "Evaluación y Diagnóstico III", prerequisitos: ["118032"] },
  { codigo: "118008", nombre: "Clínica del Movimiento Humano I", prerequisitos: ["118031"] },
  { codigo: "118009", nombre: "Clínica del Movimiento Humano II", prerequisitos: ["118047", "118032"] },
  { codigo: "118006", nombre: "Técnicas Manuales", prerequisitos: ["114018"] },
  { codigo: "118012", nombre: "Actividad y Ejercicio Físico", prerequisitos: ["150136"] },
  { codigo: "102012", nombre: "Medios Físicos", prerequisitos: ["150063"] },
  { codigo: "102050", nombre: "Ejercicio Terapéutico", prerequisitos: ["114018", "118032"] },
  { codigo: "118034", nombre: "Modalidades Terapéuticas Neuromusculares", prerequisitos: ["118009"] },
  { codigo: "118010", nombre: "Modalidades Terapéuticas Cardiopulmonares", prerequisitos: ["150075", "118009"] },
  { codigo: "118035", nombre: "Tecnologías de Asistencia", prerequisitos: ["102050", "118009"] },
  { codigo: "105036", nombre: "Filosofía de la Ciencia", prerequisitos: [] },
  { codigo: "100030", nombre: "Proceso de Investigación I", prerequisitos: ["105036"] },
  { codigo: "100031", nombre: "Proceso de Investigación II", prerequisitos: ["100030"] },
  { codigo: "118046", nombre: "Discapacidad y Contexto", prerequisitos: ["118033"] },
  { codigo: "115197", nombre: "Práctica Integral Comunitaria", prerequisitos: ["118012", "115096", "118046"] },
  { codigo: "118038", nombre: "Práctica I", prerequisitos: [] },
  { codigo: "118039", nombre: "Práctica II", prerequisitos: [] },
  { codigo: "118040", nombre: "Práctica III", prerequisitos: [] },
  { codigo: "118041", nombre: "Práctica IV", prerequisitos: [] },
  { codigo: "118042", nombre: "Práctica V", prerequisitos: ["118038"] },
  { codigo: "118043", nombre: "Práctica VI", prerequisitos: ["118039"] },
  { codigo: "118044", nombre: "Práctica VII", prerequisitos: [] },
  { codigo: "118045", nombre: "Práctica VIII", prerequisitos: [] },
  { codigo: "118036", nombre: "Seguridad y Salud en el Trabajo", prerequisitos: [] },
  { codigo: "118037", nombre: "Administración en Salud", prerequisitos: [] },
  { codigo: "100063", nombre: "Paz y Competitividad", prerequisitos: ["118036", "118038", "118039", "118040", "118041", "118042", "118043", "118044", "118045", "118037"] },
  { codigo: "105042", nombre: "Cultura Política", prerequisitos: [] },
  { codigo: "100059", nombre: "Competencias Comunicativas", prerequisitos: [] },
  { codigo: "105038", nombre: "Ética", prerequisitos: [] },
  { codigo: "101241", nombre: "Emprendimiento", prerequisitos: [] },
  { codigo: "105041", nombre: "Desarrollo Sostenible", prerequisitos: [] },
  { codigo: "113002", nombre: "Psicología en Salud", prerequisitos: [] },
  { codigo: "151601", nombre: "Inglés I", prerequisitos: [] },
  { codigo: "151602", nombre: "Inglés II", prerequisitos: ["151601"] },
  { codigo: "151603", nombre: "Inglés III", prerequisitos: ["151602"] },
  { codigo: "151604", nombre: "Inglés IV", prerequisitos: ["151603"] },
  { codigo: "151605", nombre: "Inglés V", prerequisitos: ["151604"] },
  { codigo: "151606", nombre: "Inglés VI", prerequisitos: ["151605"] },
  { codigo: "LIBRE", nombre: "Cursos Libres", prerequisitos: [] }
];

const estadoMaterias = {};
const contenedor = document.getElementById("malla");

function crearCuadro(materia) {
  const div = document.createElement("div");
  div.classList.add("materia");
  div.id = materia.codigo;
  div.innerHTML = `<strong>${materia.nombre}</strong><br><small>${materia.codigo}</small>`;
  contenedor.appendChild(div);

  estadoMaterias[materia.codigo] = {
    aprobada: false,
    prerequisitos: materia.prerequisitos,
    elemento: div
  };

  verificarDesbloqueo(materia.codigo);

  div.addEventListener("click", () => {
    if (!div.classList.contains("desbloqueada") || estadoMaterias[materia.codigo].aprobada) return;

    estadoMaterias[materia.codigo].aprobada = true;
    div.classList.remove("desbloqueada");
    div.classList.add("aprobada");

    desbloquearMateriasDependientes();
  });
}

function verificarDesbloqueo(codigo) {
  const materia = estadoMaterias[codigo];
  const habilitada = materia.prerequisitos.every(pr => estadoMaterias[pr]?.aprobada);
  if (habilitada) {
    materia.elemento.classList.add("desbloqueada");
  }
}

function desbloquearMateriasDependientes() {
  Object.keys(estadoMaterias).forEach(codigo => {
    const materia = estadoMaterias[codigo];
    if (!materia.aprobada && materia.prerequisitos.every(pr => estadoMaterias[pr]?.aprobada)) {
      materia.elemento.classList.add("desbloqueada");
    }
  });
}

materias.forEach(crearCuadro);
