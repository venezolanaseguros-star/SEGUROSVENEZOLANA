/**
 * ======================================================
 * SCRIPT.JS FINAL - LÓGICA DE CONSULTA Y DESCARGA DE PDFS
 * ======================================================
 */

// Variable global para almacenar los datos del contrato que se muestra actualmente.
let datosContratoActual = null; 

// ------------------------------------------------------------------
// 1. OBTENER ID DEL CONTRATO DESDE LA URL (URL Parameter)
// ------------------------------------------------------------------
function obtenerIdContrato() {
    const params = new URLSearchParams(window.location.search);
    return params.get('contrato');
}

// ------------------------------------------------------------------
// 2. FUNCIÓN PARA CARGAR Y MOSTRAR LOS DATOS (VERSIÓN FINAL CORREGIDA)
// ------------------------------------------------------------------
function cargarDatos(id, datos) {
    // Guarda los datos del contrato cargado en la variable global
    datosContratoActual = datos; 

    // Título (Usa .innerText)
    document.getElementById('titulo-contrato').innerText = `Contrato #${id}`;
    
    // Carga (Usa .value y el ID 'carga-value')
    document.getElementById('carga-value').value = datos.carga; 

    // Datos del Vehículo (Usa .VALUE para todos los INPUTS)
    document.getElementById('v-codigo').value = datos.vehiculo.codigo;
    document.getElementById('v-tipo').value = datos.vehiculo.tipo;
    document.getElementById('v-placa').value = datos.vehiculo.placa;
    document.getElementById('v-carroceria').value = datos.vehiculo.carroceria;
    document.getElementById('v-color').value = datos.vehiculo.color;
    document.getElementById('v-ejes').value = datos.vehiculo.ejes;

    // Datos del Carnet (Usa .VALUE para todos los INPUTS)
    document.getElementById('c-placa').value = datos.carnet.placa;
    document.getElementById('c-marca').value = datos.carnet.marca;
    document.getElementById('c-modelo').value = datos.carnet.modelo;
    document.getElementById('c-anio').value = datos.carnet.anio;

    // Mostrar el contenedor de la información y ocultar el error
    document.getElementById('info-container').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';
}

// ------------------------------------------------------------------
// 3. FUNCIÓN PARA MANEJAR CONTRATO NO ENCONTRADO O ERROR
// ------------------------------------------------------------------
function contratoNoEncontrado() {
    datosContratoActual = null; // Limpia la variable global
    document.getElementById('titulo-contrato').innerText = `Error: Contrato No Encontrado`;
    document.getElementById('info-container').style.display = 'none';
    document.getElementById('error-message').innerText = 'El código de contrato proporcionado no existe en nuestra base de datos.';
    document.getElementById('error-message').style.display = 'block';
}

// ------------------------------------------------------------------
// 4. FUNCIÓN PARA DESCARGAR PDF (Activada por los botones)
// ------------------------------------------------------------------
function descargarPDF(tipo) {
    if (!datosContratoActual) {
        alert("No hay un contrato cargado. Primero escanee o ingrese un código.");
        return;
    }

    let urlArchivo = "";

    if (tipo === 'contrato') {
        // Usa el campo 'pdfContrato' generado por Excel (Columna O)
        urlArchivo = datosContratoActual.pdfContrato; 
    } else if (tipo === 'carnet') {
        // Usa el campo 'pdfCarnet' generado por Excel (Columna P)
        urlArchivo = datosContratoActual.pdfCarnet;
    }

    if (urlArchivo) {
        // Abre el archivo en una nueva pestaña
        window.open(urlArchivo, '_blank');
        console.log(`Descargando: ${urlArchivo}`);
    } else {
        alert(`Error: No se encontró la ruta para el archivo de ${tipo}.`);
    }
}

// ------------------------------------------------------------------
// 5. FUNCIÓN DE INICIO PRINCIPAL Y PUNTO DE ENTRADA
// ------------------------------------------------------------------
function init() {
    const idContrato = obtenerIdContrato();

    if (idContrato && typeof baseDeDatos !== 'undefined') {
        const datos = baseDeDatos[idContrato];
        
        if (datos) {
            cargarDatos(idContrato, datos);
        } else {
            contratoNoEncontrado();
        }
    } else {
        contratoNoEncontrado(); 
    }
}

window.onload = init;