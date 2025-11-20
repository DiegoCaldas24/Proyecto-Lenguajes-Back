// --- Variables DOM ---
const employeeTableBody = document.getElementById('employeeTableBody');
const employeeModal = document.getElementById('employeeModal');
const confirmModal = document.getElementById('confirmModal');
const employeeForm = document.getElementById('employeeForm');
const modalTitle = document.getElementById('modalTitle');
const employeeIdField = document.getElementById('employeeIdField');
const employeeNameInput = document.getElementById('employeeName');
const employeePositionInput = document.getElementById('employeePosition');
const employeeDeptSelect = document.getElementById('employeeDept');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');

let employeeIdToDelete = null; // Para almacenar temporalmente el ID a eliminar

// --- Funciones de Utilidad (localStorage para simular DB) ---
const STORAGE_KEY = 'hr_manager_employees';

function getEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveEmployees(employees) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    renderEmployees(); // Volver a renderizar la tabla después de guardar
}

// Función para generar un ID único simple (simulación)
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// --- Funciones de Lógica de la Aplicación ---

// Listar (Renderizar) empleados
function renderEmployees() {
    const employees = getEmployees();
    employeeTableBody.innerHTML = ''; // Limpiar la tabla

    if (employees.length === 0) {
        employeeTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-text-medium); padding: 20px;">No hay empleados registrados.</td></tr>`;
        return;
    }

    employees.forEach(employee => {
        const row = employeeTableBody.insertRow();
        row.innerHTML = `
            <td>${employee.id.substring(0, 8)}...</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editEmployee('${employee.id}')">Editar</button>
                <button class="btn-delete" onclick="showDeleteConfirm('${employee.id}')">Eliminar</button>
            </td>
        `;
    });
}

// Crear/Actualizar Empleado
function saveEmployee(event) {
    event.preventDefault();

    const employees = getEmployees();
    const id = employeeIdField.value;

    const newEmployee = {
        name: employeeNameInput.value.trim(),
        position: employeePositionInput.value.trim(),
        department: employeeDeptSelect.value,
    };

    if (id) {
        // Actualizar (Update)
        const index = employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            employees[index] = { ...employees[index], ...newEmployee };
            alert('Empleado actualizado con éxito.');
        }
    } else {
        // Crear (Create)
        newEmployee.id = generateUniqueId();
        employees.push(newEmployee);
        alert('Empleado agregado con éxito.');
    }

    saveEmployees(employees);
    closeModal('employeeModal');
}

// Editar (Cargar datos en el formulario)
function editEmployee(id) {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.id === id);

    if (employee) {
        // Llenar el formulario
        employeeIdField.value = employee.id;
        employeeNameInput.value = employee.name;
        employeePositionInput.value = employee.position;
        employeeDeptSelect.value = employee.department;

        // Actualizar el título del modal
        modalTitle.textContent = 'Editar Empleado';

        showModal('employeeModal');
    }
}

// Eliminar (Delete - Lógica)
function deleteEmployee() {
    if (!employeeIdToDelete) return;

    let employees = getEmployees();
    // Filtrar y mantener a todos los que NO tengan el ID a eliminar
    employees = employees.filter(emp => emp.id !== employeeIdToDelete);

    saveEmployees(employees);
    alert('Empleado eliminado con éxito.');
    closeModal('confirmModal');
    employeeIdToDelete = null;
}

// --- Funciones de Modal ---

function showModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Configurar modal de Agregar
function setupAddModal() {
    employeeIdField.value = '';
    employeeForm.reset();
    modalTitle.textContent = 'Agregar Empleado';
    showModal('employeeModal');
}

// Mostrar modal de confirmación
function showDeleteConfirm(id) {
    employeeIdToDelete = id;
    showModal('confirmModal');
}


// --- Event Listeners ---
document.getElementById('btnAddEmployee').addEventListener('click', setupAddModal);
employeeForm.addEventListener('submit', saveEmployee);
btnConfirmDelete.addEventListener('click', deleteEmployee);

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target == employeeModal) {
        closeModal('employeeModal');
    }
    if (event.target == confirmModal) {
        closeModal('confirmModal');
    }
}

// Inicialización: Cargar la lista de empleados al cargar la página
window.onload = function() {
    // Datos de ejemplo para empezar si el localStorage está vacío
    if (getEmployees().length === 0) {
        const initialEmployees = [
            { id: generateUniqueId(), name: "Mónica Soto", position: "Gerente de Ventas", department: "Ventas" },
            { id: generateUniqueId(), name: "Carlos Luna", position: "Desarrollador Senior", department: "Desarrollo" },
            { id: generateUniqueId(), name: "Pedro Rivas", position: "Analista de RH", department: "Recursos Humanos" }
        ];
        saveEmployees(initialEmployees);
    } else {
        renderEmployees();
    }
};

// Función de alerta personalizada (Para reemplazar window.alert)
function alert(message) {
    const existingModal = document.querySelector('.custom-alert-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'custom-alert-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.4); display: flex; justify-content: center;
        align-items: center; z-index: 1001;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white; padding: 25px; border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); max-width: 300px;
        text-align: center; font-size: 1rem; color: var(--color-text-dark);
    `;

    // Determinar color de encabezado
    const isSuccess = message.toLowerCase().includes('éxito');
    const headerColor = isSuccess ? 'var(--color-success)' : 'var(--color-primary)';

    content.innerHTML = `
        <h3 style="color: ${headerColor}; margin-top: 0; font-size: 1.25rem;">${isSuccess ? '¡Éxito!' : 'Información'}</h3>
        <p>${message}</p>
        <button onclick="this.parentNode.parentNode.remove()" style="
            margin-top: 15px; padding: 8px 15px; background: var(--color-primary-light);
            color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;
            transition: background-color 0.2s;
        ">Aceptar</button>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);
}
