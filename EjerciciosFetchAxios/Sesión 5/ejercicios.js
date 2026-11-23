// =====================================================================
// SESIÓN 5 · FETCH Y AXIOS · Ejercicios 5.1 a 5.4
// (El ejercicio 5.5, la tienda con datos reales, está en tienda/)
// Para ejecutarlo: abre index.html con Live Server.
// axios ya está cargado en index.html: puedes usar axios.get, axios.post...
// =====================================================================
// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// leerFormulario(): devuelve { nombre, apellido, curso } con lo escrito.
function leerFormulario() {
  return {
    nombre: document.getElementById('nombre').value,
    apellido: document.getElementById('apellido').value,
    curso: document.getElementById('curso').value
  };
}

// mostrarCreado(creado, con): pinta en #post lo que devuelve el servidor.
function mostrarCreado(creado, con) {
  document.getElementById('post').textContent =
    `[${con}] Creado con id ${creado.id}: ${creado.nombre} ${creado.apellido} (${creado.curso})`;
}

const URL_API = 'https://jsonplaceholder.typicode.com/posts';
// ------------------------------------------------------------------------
// EJERCICIO 5.1 · De fetch a axios
// Reescribe con axios dos funciones de la sesión 4:
//   a) cargarJson: pide 'data/contenido.json' y pinta el titulo en un
//      <h3> y el mensaje en un <p> dentro de #json.
//      Los datos están en respuesta.data, ya convertidos.
//   b) cargarXml: pide 'data/contenido.xml' y pinta lo mismo en #xml.
//      axios intenta convertir todo a JSON: para recibir el XML como
//      texto, pásale la opción { responseType: 'text' }.
// Termina cada cadena con un catch, como en la sesión 4.
// Compara con tu sesión 4: ¿qué pasos te has ahorrado?
// ---------------------------------------------------------------------
function cargarJson() {
  axios.get('data/contenido.json')
    .then(respuesta => {
      const datos = respuesta.data;

      document.querySelector('#json').innerHTML =
        `<h3>${datos.titulo}</h3><p>${datos.mensaje}</p>`;
    })
    .catch(error => {
      document.getElementById('json').textContent = error.message;
    });
}

function cargarXml() {
  axios.get('data/contenido.xml', { responseType: 'text' })
    .then(respuesta => {
      // El XML llega como texto, por eso tenemos que convertirlo.
      const documento = new DOMParser().parseFromString(respuesta.data, 'text/xml');

      const titulo = documento.querySelector('titulo').textContent;
      const mensaje = documento.querySelector('mensaje').textContent;

      document.querySelector('#xml').innerHTML =
        `<h3>${titulo}</h3><p>${mensaje}</p>`;
    })
    .catch(error => {
      document.getElementById('xml').textContent = error.message;
    });
}

// Pasos que me ahorro con axios:
// Con axios no tengo que convertir manualmente la respuesta JSON, porque ya viene convertida en respuesta.data.
// Tampoco tengo que comprobar respuesta.ok, porque axios detecta automáticamente los errores de estado HTTP.

// ---------------------------------------------------------------------
// EJERCICIO 5.2 · Errores con axios
// Completa probarErrores: pide 'data/noexiste.json' con axios y, en el
// catch, pinta en #errores:
//   - err.message
//   - el código de estado, que está en err.response.status
// Después responde:
//   a) En la sesión 4 hacía falta if (!respuesta.ok) throw ... ¿Y aquí?
//   b) Si no hay conexión, err.response es undefined. ¿Por qué?
//      (Pista: ¿hay respuesta del servidor?)
// ---------------------------------------------------------------------
function probarErrores() {
  axios.get('data/noexiste.json')
    .then(respuesta => {
      document.getElementById('errores').textContent = 'Petición correcta';
    })
    .catch(err => {
      document.getElementById('errores').textContent =
        `${err.message} - Código: ${err.response.status}`;
    });
}
// a) Con axios no hace falta comprobar respuesta.ok, porque cuando recibe un error HTTP, como un 404, directamente entra en el catch.
// b) Porque si no hay conexión, el servidor no llega a enviar ninguna respuesta. Por eso err.response no existe.

// ---------------------------------------------------------------------
// EJERCICIO 5.3 · Enviar un alumno: fetch contra axios
// Escribe dos funciones que envíen un alumno a URL_API con POST y
// DEVUELVAN una promesa que se cumpla con el objeto que contesta el
// servidor (trae un id nuevo). Como pedir en la sesión 4: return y then.
//   a) enviarConFetch(alumno): recuerda method, la cabecera
//      Content-Type y JSON.stringify. Comprueba respuesta.ok.
//   b) enviarConAxios(alumno): con axios.post.
// Después completa los dos botones: leen el formulario, envían y, en
// el then, pintan el resultado con mostrarCreado(creado, 'fetch' o 'axios').
// Si algo falla, pinta el mensaje del error en #post.
// ¿Qué status devuelve el servidor? ¿Qué significa?
// ---------------------------------------------------------------------

function enviarConFetch(alumno) {
  return fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(alumno)
  })
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error('Error al enviar el alumno');
      }

      return respuesta.json();
    });
}

function enviarConAxios(alumno) {
  // Axios convierte automáticamente el objeto a JSON.
  return axios.post(URL_API, alumno)
    .then(respuesta => respuesta.data);
}

function botonFetch() {
  const alumno = leerFormulario();

  enviarConFetch(alumno)
    .then(creado => {
      mostrarCreado(creado, 'fetch');
    })
    .catch(error => {
      document.getElementById('post').textContent = error.message;
    });
}

function botonAxios() {
  const alumno = leerFormulario();

  enviarConAxios(alumno)
    .then(creado => {
      mostrarCreado(creado, 'axios');
    })
    .catch(error => {
      document.getElementById('post').textContent = error.message;
    });
}

// Status que devuelve y qué significa:
// Devuelve el código 201, que significa que el servidor ha creado correctamente un nuevo recurso.

// ---------------------------------------------------------------------
// EJERCICIO 5.4 · Tabla comparativa
// Rellena la tabla con lo que has visto en la sesión 4 y en esta.
// ---------------------------------------------------------------------
//                              | fetch                | axios
// -----------------------------|----------------------|----------------------
// ¿Hay que instalarlo?         | No, viene en JS      | Sí, hay que cargarlo
// ¿Cuántos pasos para el JSON? | Dos then             | Un then
// ¿Dónde están los datos?      | En respuesta.json()  | En respuesta.data
// ¿Un 404 va al catch?         | No, hay que comprobar| Sí, automáticamente
// ¿Cómo leo un TXT o un XML?   | Con response.text()  | Con responseType: 'text'
// ¿Cómo envío un objeto?       | JSON.stringify()     | Pasando el objeto
// ¿Cómo pongo un tiempo máximo?| Con AbortController  | Con timeout
//
// Si tuvieras que elegir uno para un proyecto, ¿cuál y por qué?
// Elegiría axios porque tiene algunas cosas más sencillas, como convertir automáticamente los datos y gestionar los errores.
// Así necesito escribir menos código para hacer las peticiones.