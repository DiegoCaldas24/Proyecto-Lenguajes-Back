// --- Constantes y Funciones de Utilidad ---
const STORAGE_KEY = 'hr_manager_employees';

function getEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// --- Lógica de Reportes y Datos ---

// 1. Obtener Datos del Sistema
function getReportData() {
    const employees = getEmployees();

    // Simular datos de asistencia (ficticios para el ejemplo)
    const attendanceData = {
        present: 45,
        absent: 3,
        late: 2
    };

    // Contar empleados por departamento
    const deptCounts = employees.reduce((acc, employee) => {
        acc[employee.department] = (acc[employee.department] || 0) + 1;
        return acc;
    }, {});

    return {
        totalEmployees: employees.length,
        deptLabels: Object.keys(deptCounts),
        deptData: Object.values(deptCounts),
        attendanceData: attendanceData
    };
}

// 2. Renderizar Métricas (KPIs)
function renderMetrics(data) {
    document.getElementById('totalEmployees').textContent = data.totalEmployees;
    // Otros KPIs se mantienen fijos para el ejemplo, pero podrían calcularse de forma similar.
}

// 3. Renderizar Gráfico de Distribución por Departamento (Gráfico de Barras)
function renderDeptChart(labels, data) {
    const ctx = document.getElementById('deptChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Empleados',
                data: data,
                backgroundColor: [
                    'rgba(30, 64, 175, 0.8)', // Primary
                    'rgba(5, 150, 105, 0.8)', // Secondary
                    'rgba(245, 158, 11, 0.8)', // Warning
                    'rgba(239, 68, 68, 0.8)', // Danger
                    'rgba(99, 102, 241, 0.8)' // Indigo
                ],
                borderColor: [
                    'var(--color-primary)',
                    'var(--color-secondary)',
                    '#f59e0b',
                    '#ef4444',
                    '#6366f1'
                ],
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad'
                    },
                    ticks: {
                        precision: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                }
            }
        }
    });
}

// 4. Renderizar Gráfico de Estado de Asistencia (Gráfico de Dona)
function renderAttendanceChart(attendanceData) {
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Presente', 'Ausente', 'Tarde'],
            datasets: [{
                data: [attendanceData.present, attendanceData.absent, attendanceData.late],
                backgroundColor: [
                    'var(--color-secondary)', // Presente (Verde)
                    '#ef4444', // Ausente (Rojo)
                    '#f59e0b', // Tarde (Amarillo)
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20
                    }
                },
                title: {
                    display: false,
                }
            }
        }
    });
}

// --- Inicialización ---
window.onload = function() {
    // Cargar los datos
    const reportData = getReportData();

    // 1. Renderizar las métricas
    renderMetrics(reportData);

    // 2. Renderizar el gráfico de barras por departamento
    renderDeptChart(reportData.deptLabels, reportData.deptData);

    // 3. Renderizar el gráfico de dona de asistencia
    renderAttendanceChart(reportData.attendanceData);
};