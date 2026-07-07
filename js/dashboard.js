// Datos simulados
const datosHistoricos = [
    { fecha: "2026-07-06", emocion: "Calma", estres: 3, ansiedad: 2 },
    { fecha: "2026-07-05", emocion: "Estrés", estres: 9, ansiedad: 6 }, // Registro crítico
    { fecha: "2026-07-04", emocion: "Ansiedad", estres: 8, ansiedad: 9 }, // Registro crítico
    { fecha: "2026-07-03", emocion: "Feliz", estres: 2, ansiedad: 1 }
];

/**
 * renderizarHistorial inyecta filas en la tabla del DOM dinámicamente.
 */
function renderizarHistorial() {
    const tbody = document.getElementById('cuerpo-historial');
    tbody.innerHTML = ""; // Limpieza previa del DOM
    
    datosHistoricos.forEach(registro => {
        const fila = document.createElement('tr');
        
        // Lógica de detección de riesgo: si el estrés o ansiedad supera el umbral
        if (registro.estres >= 8 || registro.ansiedad >= 8) {
            fila.classList.add('table-riesgo-alto'); // Clase definida en CSS para alerta visual
        }
        
        fila.innerHTML = `
            <td>${registro.fecha}</td>
            <td>${registro.emocion}</td>
            <td>${registro.estres}</td>
            <td>${registro.ansiedad}</td>
        `;
        tbody.appendChild(fila);
    });
}

/**
 * actualizarMetricas Calcula estadísticas globales (promedios y conteo de alertas).
 */
function actualizarMetricas() {
    const contenedor = document.getElementById('metricas-resumen');
    const total = datosHistoricos.length;
    
    // Cálculo del promedio de estrés (método reduce)
    const promedioEstres = (datosHistoricos.reduce((a, b) => a + b.estres, 0) / total).toFixed(1);
    
    // Filtrado de días críticos (método filter) para reporte de alertas
    const diasAlerta = datosHistoricos.filter(r => r.estres >= 8 || r.ansiedad >= 8).length;

    // Inyección de métricas en tarjetas Bootstrap
    contenedor.innerHTML = `
        <div class="col-md-6">
            <div class="p-3 border rounded shadow-sm">
                <small class="text-muted">Promedio de Estrés</small>
                <h3 class="fw-bold">${promedioEstres} / 10</h3>
            </div>
        </div>
        <div class="col-md-6">
            <div class="p-3 border rounded shadow-sm">
                <small class="text-muted">Días en Nivel Crítico</small>
                <h3 class="fw-bold text-danger">${diasAlerta}</h3>
            </div>
        </div>
    `;
}

// Inicialización: Ejecutar funciones al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    renderizarHistorial();
    actualizarMetricas();
});