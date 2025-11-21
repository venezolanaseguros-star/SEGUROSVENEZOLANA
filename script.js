/* ARCHIVO: script.js
   DESCRIPCIÓN: Maneja la lógica de la página y lee la información
   que viene del archivo externo 'datos.js' (generado por Excel).
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. VALIDACIÓN DE SEGURIDAD
    // Verificamos si el archivo de datos se cargó correctamente
    if (typeof baseDeDatos === 'undefined') {
        alert("Error: No se encontraron datos. Asegúrate de haber generado el archivo datos.js desde Excel.");
        document.getElementById('titulo-contrato').innerText = "Error de Datos";
        return;
    }

    // 2. OBTENER EL ID DEL CONTRATO DESDE LA URL
    // Ejemplo: si la url es index.html?contrato=70126, esto obtiene "70126"
    const parametros = new URLSearchParams(window.location.search);
    const idContrato = parametros.get('contrato');

    // 3. BUSCAR Y MOSTRAR DATOS
    if (idContrato && baseDeDatos[idContrato]) {
        // ¡El contrato existe! Cargamos la info
        cargarDatos(idContrato, baseDeDatos[idContrato]);
    } else {
        // El contrato no existe o no se puso en el link
        manejarError(idContrato);
    }
});

// --- FUNCIÓN PARA LLENAR LOS CAMPOS ---
function cargarDatos(id, datos) {
    // Título
    document.getElementById('titulo-contrato').innerText = `Contrato #${id}`;
    
    // Selector de carga
    // Aseguramos que el valor de Excel coincida con las opciones del HTML
    const selectCarga = document.getElementById('tipo-carga');
    selectCarga.value = datos.carga; 

    // Datos del Vehículo
    document.getElementById('v-codigo').value = datos.vehiculo.codigo;
    document.getElementById('v-tipo').value = datos.vehiculo.tipo;
    document.getElementById('v-placa').value = datos.vehiculo.placa;
    document.getElementById('v-carroceria').value = datos.vehiculo.carroceria;
    document.getElementById('v-color').value = datos.vehiculo.color;
    document.getElementById('v-ejes').value = datos.vehiculo.ejes;

    // Datos del Carnet
    document.getElementById('c-placa').value = datos.carnet.placa;
    document.getElementById('c-marca').value = datos.carnet.marca;
    document.getElementById('c-modelo').value = datos.carnet.modelo;
    document.getElementById('c-anio').value = datos.carnet.anio;
    
    console.log(`Datos cargados exitosamente para el contrato #${id}`);
}

// --- FUNCIÓN DE ERROR ---
function manejarError(id) {
    const titulo = document.getElementById('titulo-contrato');
    
    if (!id) {
        titulo.innerText = "Esperando Contrato...";
        console.log("No se especificó ningún contrato en la URL.");
    } else {
        titulo.innerText = "Contrato No Encontrado";
        alert(`El contrato número "${id}" no está en la base de datos de Excel.`);
    }
    
    // Opcional: Limpiar los campos por si acaso
    const inputs = document.querySelectorAll('.custom-input');
    inputs.forEach(input => input.value = "");
}

// --- FUNCIONES DE LOS BOTONES ---

function descargarPDF(tipo) {
    // Obtenemos el número actual del título
    const tituloActual = document.getElementById('titulo-contrato').innerText;
    
    if (tituloActual.includes("No Encontrado") || tituloActual.includes("Error")) {
        alert("No hay datos válidos para descargar.");
        return;
    }

    if (tipo === 'contrato') {
        alert(`📄 Generando PDF del ${tituloActual}...`);
        // Aquí iría tu código real de descarga
    } else if (tipo === 'carnet') {
        alert(`🪪 Generando Carnet de Circulación asociado al ${tituloActual}...`);
    }
}

function volver() {
    // Intenta volver atrás en el historial del navegador
    if (window.history.length > 1) {
        window.history.back();
    } else {
        alert("No hay página anterior a la cual volver.");
    }
}