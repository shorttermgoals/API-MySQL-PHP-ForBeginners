// Variables con las rutas de nuestros archivos del back-end

const urlAgregarContenido = "http://localhost/2DAM/Primer%20trimestre/API-MySQL-PHP-ForBeginners/php/agregarContenido.php"
const urlEditarContenido = "http://localhost/2DAM/Primer%20trimestre/API-MySQL-PHP-ForBeginners/php/editarContenido.php"
const urlBorrarContenido = "http://localhost/2DAM/Primer%20trimestre/API-MySQL-PHP-ForBeginners/php/borrarContenido.php"
const urlObtenerContenido = "http://localhost/2DAM/Primer%20trimestre/API-MySQL-PHP-ForBeginners/php/obtenerContenido.php"

// Variable donde almacenaremos la lista de contenidos

let listaContenidos = []

// Objeto con los atributos vacios, que rellenaremos con los datos introducidos en el formulario
// que posteriormente introduciremos en la base de datos

const objetoContenido = {
    id: "",
    nombre: "",
    apellidos: "",
    edad: "",
    altura: ""
}

// Booleano que nos informará de si se está editando el contenido, si no es cierto la veremos como false

let editando = false

// Variable que localiza el elemento HTMl del formulario

const formulario = document.querySelector("#form")

// Variables que localizan todos los elementos del formulario

const nombreForm = document.querySelector("#nombre")
const apellidosForm = document.querySelector("#apellidos")
const edadForm = document.querySelector("#edad")
const alturaForm = document.querySelector("#altura")

// Cuando se haga el submit de los datos del formulario se activara la función validar
formulario.addEventListener('submit', validar)

// La funcióm recibirar un evento
function validar(e){
    // Evitamos que se ejecute de forma automatica, solo cuando pulsemos el botón
    e.preventDefault()

    //Con este condicional nos aseguramos de que se rellenen todos los campos
    if([nombreForm.value, apellidosForm.value, edadForm.value, alturaForm.value].includes('')){
        // Si cualquiera de los campos esta vacio, es decir, esté compuesto por un hueco vacio, imprimiremos el siguiente mensaje
        alert("Es necesario rellenar todos los campos")
        return
    }
}

// Funcion para enseñar los datos de la base de datos

async function obtenerContenido(){

    // Mete en la lista los datos extraidos del back-end
    // Convertimos la respuesta en un json de los datos
    // Si hay un error se imprimirá en consola
    listaContenidos = await fetch(urlObtenerContenido)
    .then(respuesta => respuesta.json())
    .then(datos => datos)
    .catch(error => console.log(error))

    mostrarContenidos()
}

obtenerContenido()

// Función que mostrará los datos en el div seleccionado
function mostrarContenidos(){

    // Creamos una variable que localice el div donde queremos imprimir los datos
    const divContenido = document.querySelector(".contenidos")

    // Recorremos el listado 
    listaContenidos.forEach(contenido => {
        const {id,nombre,apellidos,edad,altura} = contenido

        // Creamos un parrafo para visualizar los elementos del contenido
        const parrafo = document.createElement('p')
        parrafo.textContent = `${id}. Nombre: ${nombre} ${apellidos} / Edad: ${edad} / Altura(cm): ${altura}`
        parrafo.dataset.id = id

        // Cremos una separación
        const hr = document.createElement('hr')

        // Vamos a agregar el parrafo y la separación a nuesto elemento padre, en este caso el div de contenido
        divContenido.appendChild(parrafo)
        divContenido.appendChild(hr)
    })
}