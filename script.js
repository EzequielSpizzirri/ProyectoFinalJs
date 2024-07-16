document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    actualizarEstadisticas();
});

function cargarDatos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            alumnos = data.alumnos;
            actualizarListaAlumnos();
            actualizarEstadisticas();
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
}

// Array para almacenar las notas de los alumnos
let notas = [];

// Función para agregar una nota al array de notas
function agregarNota() {
    const notaInput = document.getElementById('nota');
    const nota = parseFloat(notaInput.value);
    if (isNaN(nota) || nota < 0 || nota > 10) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese una nota válida (entre 0 y 10).'
        });
    } else {
        notas.push(nota);
        notaInput.value = '';
        actualizarListaNotas();
        actualizarEstadisticas();
    }
}

// Función para calcular el promedio de las notas
function calcularPromedio() {
    if (notas.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay notas ingresadas.'
        });
        return;
    }
    let suma = 0;
    for (let nota of notas) {
        suma += nota;
    }
    const promedio = suma / notas.length;
    mostrarResultado(`El promedio de las notas es: ${promedio.toFixed(2)}`);
}

// Función para mostrar el resultado en el HTML
function mostrarResultado(mensaje) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = mensaje;
}

// Función para actualizar la lista de notas en el HTML
function actualizarListaNotas() {
    const notasList = document.getElementById('notasList');
    notasList.innerHTML = '';
    for (let nota of notas) {
        const li = document.createElement('li');
        li.innerText = nota;
        notasList.appendChild(li);
    }
}

// Función para limpiar el array de notas y el mensaje de resultado
function limpiarNotas() {
    notas = [];
    mostrarResultado('');
    actualizarListaNotas();
    actualizarEstadisticas();
}

// Funciones de operaciones matemáticas
function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return "Error: división por cero";
    }
    return a / b;
}

function mostrarOperaciones(mensaje) {
    const resultDiv = document.getElementById('resultOperaciones');
    resultDiv.innerText = mensaje;
}

// Event listeners para los botones
document.getElementById('agregarNotaButton').addEventListener('click', agregarNota);
document.getElementById('calcularPromedioButton').addEventListener('click', calcularPromedio);
document.getElementById('limpiarButton').addEventListener('click', limpiarNotas);

document.getElementById('sumarButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(suma(num1, num2));
});

document.getElementById('restarButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(resta(num1, num2));
});

document.getElementById('multiplicarButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(multiplicacion(num1, num2));
});

document.getElementById('dividirButton').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    mostrarOperaciones(division(num1, num2));
});

// Constructor para Alumno
function Alumno(nombre, apellido, notas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.notas = notas;
}

// Array para almacenar los alumnos
let alumnos = [];

// Función para agregar un alumno al array de alumnos
function agregarAlumno() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const notasInput = document.getElementById('notas');

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const notasString = notasInput.value.trim();

    if (nombre === '' || apellido === '' || notasString === '') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, complete todos los campos.'
        });
        return;
    }

    const notas = notasString.split(',').map(nota => parseFloat(nota.trim()));
    if (notas.some(isNaN)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese notas válidas (números separados por coma).'
        });
        return;
    }

    const nuevoAlumno = new Alumno(nombre, apellido, notas);
    alumnos.push(nuevoAlumno);

    nombreInput.value = '';
    apellidoInput.value = '';
    notasInput.value = '';

    Swal.fire({
        icon: 'success',
        title: '¡Alumno agregado!',
        text: `${nombre} ${apellido} ha sido agregado correctamente.`
    });

    actualizarListaAlumnos();
    actualizarEstadisticas();
}

// Función para buscar alumnos por nombre o apellido
function buscarAlumno() {
    const buscarInput = document.getElementById('buscar');
    const textoBuscar = buscarInput.value.trim().toLowerCase();
    const resultados = alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(textoBuscar) ||
        alumno.apellido.toLowerCase().includes(textoBuscar)
    );

    mostrarResultadosBusqueda(resultados);
}

// Función para mostrar los resultados de búsqueda en el HTML
function mostrarResultadosBusqueda(resultados) {
    const listaAlumnos = document.getElementById('listaAlumnos');
    listaAlumnos.innerHTML = '';

    if (resultados.length === 0) {
        const mensaje = document.createElement('li');
        mensaje.textContent = 'No se encontraron resultados.';
        listaAlumnos.appendChild(mensaje);
    } else {
        resultados.forEach(alumno => {
            const item = document.createElement('li');
            item.textContent = `${alumno.nombre} ${alumno.apellido}: ${alumno.notas.join(', ')}`;
            listaAlumnos.appendChild(item);
        });
    }
}

// Función para actualizar la lista de alumnos en el HTML
function actualizarListaAlumnos() {
    const listaAlumnos = document.getElementById('listaAlumnos');
    listaAlumnos.innerHTML = '';

    alumnos.forEach(alumno => {
        const item = document.createElement('li');
        item.textContent = `${alumno.nombre} ${alumno.apellido}: ${alumno.notas.join(', ')}`;
        item.classList.add('animate__animated', 'animate__fadeIn');
        listaAlumnos.appendChild(item);
    });
}

// Función para actualizar las estadísticas
function actualizarEstadisticas() {
    document.getElementById('totalAlumnos').innerText = alumnos.length;
    document.getElementById('totalNotas').innerText = notas.length;
}

// Event listeners para los botones de agregar alumno y buscar alumno
document.getElementById('agregarAlumnoButton').addEventListener('click', agregarAlumno);
document.getElementById('buscarAlumnoButton').addEventListener('click', buscarAlumno);