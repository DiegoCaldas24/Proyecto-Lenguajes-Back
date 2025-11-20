// Inicialización de variables DOM
const clockDisplay = document.getElementById('clock');
const btnEntrada = document.getElementById('btnEntrada');
const btnSalida = document.getElementById('btnSalida');
const employeeInput = document.getElementById('employeeId');
const actionButton = document.getElementById('actionButton');

let currentMode = 'entrada'; // Estado inicial: 'entrada'

// Función para actualizar el reloj digital
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Función para cambiar el modo (Entrada o Salida)
function setMode(mode) {
    currentMode = mode;

    // 1. Gestionar clases de los botones de modo
    btnEntrada.classList.remove('active', 'active-entrada');
    btnSalida.classList.remove('active', 'active-salida');

    if (mode === 'entrada') {
        btnEntrada.classList.add('active', 'active-entrada');
        actionButton.textContent = 'Registrar Entrada';
        actionButton.className = 'action-button button-entrada';
    } else {
        btnSalida.classList.add('active', 'active-salida');
        actionButton.textContent = 'Registrar Salida';
        actionButton.className = 'action-button button-salida';
    }
}

// Función que maneja el registro (simulación)
function handleRegistration() {
    const employeeId = employeeInput.value.trim();

    if (!employeeId) {
        // En lugar de alert, simulamos un mensaje de error en la consola
        console.error("Error: Por favor, ingrese su número de empleado.");
        employeeInput.style.borderColor = 'var(--color-danger)';
        setTimeout(() => employeeInput.style.borderColor = '#e5e7eb', 1500);
        return;
    }

    const timestamp = new Date().toLocaleString();

    // Simulación de envío de datos
    const message = `[${timestamp}] Empleado ${employeeId} registró ${currentMode === 'entrada' ? 'ENTRADA' : 'SALIDA'}.`;
    console.log("Registro exitoso:", message);

    // Opcional: limpiar el campo después de un registro exitoso
    employeeInput.value = '';

    // Muestra un mensaje de éxito simulado (en este caso, un log)
    alert(`¡Registro de ${currentMode === 'entrada' ? 'Entrada' : 'Salida'} exitoso para Empleado ${employeeId} a las ${clockDisplay.textContent}! (Ver consola para el log)`);
}

// Event Listeners
btnEntrada.addEventListener('click', () => setMode('entrada'));
btnSalida.addEventListener('click', () => setMode('salida'));
actionButton.addEventListener('click', handleRegistration);

// Iniciar el reloj inmediatamente y luego cada segundo
updateClock();
setInterval(updateClock, 1000);

// Función de alerta personalizada (para reemplazar window.alert)
function alert(message) {
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
        align-items: center; z-index: 1000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white; padding: 25px; border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); max-width: 80%;
        text-align: center; font-size: 1rem; color: var(--color-text-dark);
    `;
    content.innerHTML = `<p>${message}</p><button onclick="this.parentNode.parentNode.remove()" style="
        margin-top: 15px; padding: 8px 15px; background: var(--color-primary);
        color: white; border: none; border-radius: 6px; cursor: pointer;
    ">Aceptar</button>`;

    modal.appendChild(content);
    document.body.appendChild(modal);
}