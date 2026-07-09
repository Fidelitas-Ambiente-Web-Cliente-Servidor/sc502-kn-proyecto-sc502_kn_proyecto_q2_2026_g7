/**
 REGISTRO EMOCIONAL DIARIO
 */

// Umbral a partir del cual un nivel se considera crítico (estres o ansiedad >= 8)
const UMBRAL_CRITICO = 8;

// Contactos de apoyo estudiantil de la universidad, mostrados en el banner de alerta
const CONTACTOS_APOYO = [
  { nombre: "Bienestar Estudiantil (línea directa)", dato: "2222-0000" },
  { nombre: "Psicología UNI - Citas", dato: "psicologia@uni.ac.cr" },
  { nombre: "Línea de crisis 24/7 (Costa Rica)", dato: "192" }
];

/**
 * validarFormularioDiario valida el formulario del test diario y
 * refleja los errores en el DOM. Devuelve true si todo es válido.
 */
function validarFormularioDiario() {
  let todoValido = true;

  const emocion = document.getElementById("diarioEmocion");
  const estres = document.getElementById("diarioEstres");
  const ansiedad = document.getElementById("diarioAnsiedad");
  const comentarios = document.getElementById("diarioComentarios");
  const boton = document.getElementById("btnSubmitDiario");

  // Emoción: obligatoria
  if (emocion.value === "") {
    emocion.classList.add("input-invalido");
    document.getElementById("errorDiarioEmocion").textContent = "Selecciona la emoción que mejor describe tu día.";
    todoValido = false;
  } else {
    emocion.classList.remove("input-invalido");
    document.getElementById("errorDiarioEmocion").textContent = "";
  }

  // Estres y ansiedad: deben ser numéricos dentro de 1-10)
  const valorEstres = Number(estres.value);
  const valorAnsiedad = Number(ansiedad.value);

  if (Number.isNaN(valorEstres) || valorEstres < 1 || valorEstres > 10) {
    document.getElementById("errorDiarioEstres").textContent = "El nivel de estrés debe estar entre 1 y 10.";
    todoValido = false;
  } else {
    document.getElementById("errorDiarioEstres").textContent = "";
  }

  if (Number.isNaN(valorAnsiedad) || valorAnsiedad < 1 || valorAnsiedad > 10) {
    document.getElementById("errorDiarioAnsiedad").textContent = "El nivel de ansiedad debe estar entre 1 y 10.";
    todoValido = false;
  } else {
    document.getElementById("errorDiarioAnsiedad").textContent = "";
  }

  // Comentarios: opcional
  if (comentarios.value.length > 500) {
    comentarios.classList.add("input-invalido");
    document.getElementById("errorDiarioComentarios").textContent = "Máximo 500 caracteres.";
    todoValido = false;
  } else {
    comentarios.classList.remove("input-invalido");
    document.getElementById("errorDiarioComentarios").textContent = "";
  }

  boton.disabled = !todoValido;
  return todoValido;
}

/**
 * actualizarIndicadoresRango sincroniza las burbujas numericas de los sliders
 * y les añade la clase de "critico" cuando el valor alcanza el rango
 */
function actualizarIndicadoresRango() {
  const estresInput = document.getElementById("diarioEstres");
  const ansiedadInput = document.getElementById("diarioAnsiedad");
  const valorEstres = document.getElementById("valorEstres");
  const valorAnsiedad = document.getElementById("valorAnsiedad");

  valorEstres.textContent = estresInput.value;
  valorAnsiedad.textContent = ansiedadInput.value;

  valorEstres.classList.toggle("valor-critico", Number(estresInput.value) >= UMBRAL_CRITICO);
  valorAnsiedad.classList.toggle("valor-critico", Number(ansiedadInput.value) >= UMBRAL_CRITICO);
}

/**
 * mostrarBannerAlerta inyecta dinámicamente el banner de alerta preventiva
 * con los contactos de apoyo estudiantil cuando el registro es critico
 */
function mostrarBannerAlerta() {
  const banner = document.getElementById("bannerAlerta");

  const listaContactos = CONTACTOS_APOYO
    .map(c => `<li>${c.nombre}: <a href="tel:${c.dato.replace(/\D/g, "")}">${c.dato}</a></li>`)
    .join("");

  banner.innerHTML = `
    <h3>⚠️ Detectamos niveles altos de estrés o ansiedad</h3>
    <p>No estás solo/a. Si sientes que necesitas hablar con alguien ahora, estos contactos de apoyo estudiantil están disponibles para ti:</p>
    <ul>${listaContactos}</ul>
  `;
  banner.classList.remove("modulo-oculto");
  banner.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * ocultarBannerAlerta limpia y oculta el banner cuando el registro ya no es critico
 */
function ocultarBannerAlerta() {
  const banner = document.getElementById("bannerAlerta");
  banner.classList.add("modulo-oculto");
  banner.innerHTML = "";
}

/**
 * mostrarConfirmacion da feedback visual de que el registro se guardo correctamente.
 */
function mostrarConfirmacion() {
  const confirmacion = document.getElementById("confirmacionDiario");
  confirmacion.textContent = "Registro guardado. Gracias por tomarte un momento para ti hoy.";
  confirmacion.classList.remove("modulo-oculto");
}

/**
 * procesarEnvioDiario construye el objeto de registro a partir del formulario,
 * decide si debe mostrarse la alerta preventiva
 */
function procesarEnvioDiario(evento) {
  evento.preventDefault();

  if (!validarFormularioDiario()) {
    return;
  }

  const registro = {
    emocion: document.getElementById("diarioEmocion").value,
    nivel_estres: Number(document.getElementById("diarioEstres").value),
    nivel_ansiedad: Number(document.getElementById("diarioAnsiedad").value),
    comentarios: document.getElementById("diarioComentarios").value.trim(),
    fecha: new Date().toISOString().slice(0, 10)
  };

  const esCritico = registro.nivel_estres >= UMBRAL_CRITICO || registro.nivel_ansiedad >= UMBRAL_CRITICO;

  if (esCritico) {
    mostrarBannerAlerta();
  } else {
    ocultarBannerAlerta();
  }

  // TODO (integración backend): reemplazar por fetch("/api/registros_emocionales", { method: "POST", body: JSON.stringify(registro) })
  guardarRegistroLocal(registro);
  mostrarConfirmacion();
}

/**
 * guardarRegistroLocal es un placeholder temporal mientras no existe backend.
 * Guarda el registro en memoria de sesion (window) para que otros modulos
 * como el dashboard puedan leerlo durante el desarrollo.
 */
function guardarRegistroLocal(registro) {
  window.registrosEmocionalesSesion = window.registrosEmocionalesSesion || [];
  window.registrosEmocionalesSesion.push(registro);
}

// Eventos al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  const formDiario = document.getElementById("formDiario");
  const estresInput = document.getElementById("diarioEstres");
  const ansiedadInput = document.getElementById("diarioAnsiedad");

  actualizarIndicadoresRango();
  validarFormularioDiario();

  formDiario.addEventListener("input", () => {
    actualizarIndicadoresRango();
    validarFormularioDiario();
  });

  estresInput.addEventListener("input", actualizarIndicadoresRango);
  ansiedadInput.addEventListener("input", actualizarIndicadoresRango);

  formDiario.addEventListener("submit", procesarEnvioDiario);
});
