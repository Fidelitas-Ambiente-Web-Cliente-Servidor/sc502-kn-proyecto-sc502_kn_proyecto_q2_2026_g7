/**
 * LÓGICA DE AUTENTICACIÓN
 */

function validarFormularioAuth() {
  let todoValido = true;
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  const contenedorLogin = document.getElementById("contenedorLogin");
  const mostrandoLogin = !contenedorLogin.classList.contains("modulo-oculto");

  if (mostrandoLogin === true) {
    // VALIDACIÓN LOGIN
    const correo = document.getElementById("loginCorreo");
    const clave = document.getElementById("loginClave");
    const boton = document.getElementById("btnSubmitLogin");

    if (correo.value.trim() === "" || !patronCorreo.test(correo.value.trim())) {
      correo.classList.add("input-invalido");
      document.getElementById("errorLoginCorreo").textContent = "Ingrese un correo válido.";
      todoValido = false;
    } else {
      correo.classList.remove("input-invalido");
      document.getElementById("errorLoginCorreo").textContent = "";
    }

    if (clave.value === "") {
      clave.classList.add("input-invalido");
      document.getElementById("errorLoginClave").textContent = "La contraseña es obligatoria.";
      todoValido = false;
    } else {
      clave.classList.remove("input-invalido");
      document.getElementById("errorLoginClave").textContent = "";
    }
    boton.disabled = !todoValido;
  } else {
    // VALIDACIÓN REGISTRO
    const nombre = document.getElementById("regNombre");
    const correo = document.getElementById("regCorreo");
    const clave = document.getElementById("regClave");
    const boton = document.getElementById("btnSubmitRegistro");

    if (nombre.value.trim().length < 5 || !patronLetras.test(nombre.value.trim())) {
      nombre.classList.add("input-invalido");
      document.getElementById("errorRegNombre").textContent = "Mínimo 5 letras (sin números).";
      todoValido = false;
    } else {
      nombre.classList.remove("input-invalido");
      document.getElementById("errorRegNombre").textContent = "";
    }

    if (correo.value.trim() === "" || !patronCorreo.test(correo.value.trim())) {
      correo.classList.add("input-invalido");
      document.getElementById("errorRegCorreo").textContent = "Ingrese un correo válido.";
      todoValido = false;
    } else {
      correo.classList.remove("input-invalido");
      document.getElementById("errorRegCorreo").textContent = "";
    }

    if (clave.value.length < 5) {
      clave.classList.add("input-invalido");
      document.getElementById("errorRegClave").textContent = "Mínimo 5 caracteres.";
      todoValido = false;
    } else {
      clave.classList.remove("input-invalido");
      document.getElementById("errorRegClave").textContent = "";
    }
    boton.disabled = !todoValido;
  }
  return todoValido;
}

// Eventos al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  const btnVerLogin = document.getElementById("btnVerLogin");
  const btnVerRegistro = document.getElementById("btnVerRegistro");
  const contenedorLogin = document.getElementById("contenedorLogin");
  const contenedorRegistro = document.getElementById("contenedorRegistro");
  const formLogin = document.getElementById("formLogin");
  const formRegistro = document.getElementById("formRegistro");

  // Navegación entre pestañas
  btnVerLogin.addEventListener("click", () => {
    btnVerRegistro.classList.remove("active");
    btnVerLogin.classList.add("active");
    contenedorRegistro.classList.add("modulo-oculto");
    contenedorLogin.classList.remove("modulo-oculto");
    validarFormularioAuth();
  });

  btnVerRegistro.addEventListener("click", () => {
    btnVerLogin.classList.remove("active");
    btnVerRegistro.classList.add("active");
    contenedorLogin.classList.add("modulo-oculto");
    contenedorRegistro.classList.remove("modulo-oculto");
    validarFormularioAuth();
  });

  // Validación en tiempo real
  formLogin.addEventListener("input", validarFormularioAuth);
  formRegistro.addEventListener("input", validarFormularioAuth);

  // REDIRECCIÓN CORREGIDA
  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (validarFormularioAuth() === true) {
      window.location.href = "menu.html"; // Redirección directa
    }
  });

  formRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (validarFormularioAuth() === true) {
      window.location.href = "menu.html"; // Redirección directa
    }
  });
});