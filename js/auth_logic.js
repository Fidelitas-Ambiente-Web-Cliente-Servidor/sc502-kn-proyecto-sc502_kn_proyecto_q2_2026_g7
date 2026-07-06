/**
 * LÓGICA DE AUTENTICACIÓN - CORREGIDA Y ROBUSTA
 */

function validarFormularioAuth() {
  let todoValido = true;

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const patronLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  // Comprobar cuál contenedor está oculto mediante nuestra clase CSS
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

function simularExitoAuth(textoMensaje) {
  const tarjeta = document.querySelector(".card-autenticacion");
  tarjeta.innerHTML = ""; 

  const cajaExito = document.createElement("div");
  cajaExito.className = "text-center py-4 text-success";
  
  cajaExito.innerHTML = `
    <h4>¡Operación Exitosa!</h4>
    <p class="text-muted">${textoMensaje}</p>
    <p class="small text-warning fw-bold">Modo provisional: Listo para conectar a PHP en la próxima clase.</p>
  `;

  tarjeta.appendChild(cajaExito);
}

document.addEventListener("DOMContentLoaded", () => {
  const btnVerLogin = document.getElementById("btnVerLogin");
  const btnVerRegistro = document.getElementById("btnVerRegistro");
  const contenedorLogin = document.getElementById("contenedorLogin");
  const contenedorRegistro = document.getElementById("contenedorRegistro");
  const formLogin = document.getElementById("formLogin");
  const formRegistro = document.getElementById("formRegistro");

  // Al hacer clic en Iniciar Sesión
  btnVerLogin.addEventListener("click", () => {
    btnVerRegistro.classList.remove("active");
    btnVerLogin.classList.add("active");
    contenedorRegistro.classList.add("modulo-oculto"); // Oculta Registro
    contenedorLogin.classList.remove("modulo-oculto"); // Muestra Login
    validarFormularioAuth();
  });

  // Al hacer clic en Registrarse
  btnVerRegistro.addEventListener("click", () => {
    btnVerLogin.classList.remove("active");
    btnVerRegistro.classList.add("active");
    contenedorLogin.classList.add("modulo-oculto");    // Oculta Login
    contenedorRegistro.classList.remove("modulo-oculto"); // Muestra Registro
    validarFormularioAuth();
  });

  formLogin.addEventListener("input", validarFormularioAuth);
  formRegistro.addEventListener("input", validarFormularioAuth);

  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault(); 
    if (validarFormularioAuth() === true) {
      simularExitoAuth("Ingresando de forma temporal...");
    }
  });

  formRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (validarFormularioAuth() === true) {
      simularExitoAuth("Su usuario ha sido registrado provisionalmente.");
    }
  });
});