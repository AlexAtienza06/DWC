// =====================================================================
// SESIÓN 4 · FETCH CON FORMATOS · Ejercicios 4.1 a 4.6
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: abre index.html con Live Server (clic derecho →
// «Open with Live Server»). Con doble clic (file://) fetch no funciona.
// Los archivos que vas a pedir están en la carpeta data/.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// pintarTabla(alumnos, titulo): devuelve una <table> con los alumnos.
// alumnos es un array de objetos { nombre, apellido, edad, curso }.
function pintarTabla(alumnos, titulo) {
  const tabla = document.createElement('table');
  const caption = document.createElement('caption');
  caption.textContent = titulo;
  tabla.append(caption);
  const cabecera = tabla.insertRow();
  for (const campo of ['Nombre', 'Apellido', 'Edad', 'Curso']) {
    const th = document.createElement('th');
    th.textContent = campo;
    cabecera.append(th);
  }
  for (const a of alumnos) {
    const fila = tabla.insertRow();
    for (const valor of [a.nombre, a.apellido, a.edad, a.curso]) {
      fila.insertCell().textContent = valor;
    }
  }
  return tabla;
}
// ------------------------------------------------------------------------
// EJERCICIO 4.1 · Mira la respuesta por dentro
// Haz un fetch de 'data/contenido.json' con then y, en el primer then,
// muestra por consola:
//   - la respuesta entera
//   - respuesta.status y respuesta.ok
//   - el tipo de contenido: respuesta.headers.get('Content-Type')
// Después lee el contenido con .json() y, en un segundo then, muestra
// los datos por consola. Termina la cadena con un catch.
//
// Repite lo mismo con 'data/contenido.txt' (léelo con .text()).
// ¿Qué Content-Type tiene cada uno?
// ---------------------------------------------------------------------
// Tu código aquí:
// Pedimos el archivo JSON y mostramos los datos de su respuesta.
fetch('data/contenido.json')
  .then(respuesta => {
    console.log(respuesta);
    console.log(respuesta.status);
    console.log(respuesta.ok);
    console.log(respuesta.headers.get('Content-Type'));

    return respuesta.json();
  })
  .then(datos => {
    console.log(datos);
  })
  .catch(error => {
    console.log(error.message);
  });

// Hacemos lo mismo con el TXT, pero lo leemos como texto.
fetch('data/contenido.txt')
  .then(respuesta => {
    console.log(respuesta);
    console.log(respuesta.status);
    console.log(respuesta.ok);
    console.log(respuesta.headers.get('Content-Type'));

    return respuesta.text();
  })
  .then(datos => {
    console.log(datos);
  })
  .catch(error => {
    console.log(error.message);
  });

// Content-Type del JSON: application/json
// Content-Type del TXT: text/plain

// ---------------------------------------------------------------------
// EJERCICIO 4.2 · Cuatro formatos
// Completa las cuatro funciones. Cada una pide su archivo de data/ y
// pinta el resultado en su caja (#json, #txt, #html y #xml).
// Los botones de la página ya las llaman.
//   - JSON: léelo con .json(). Pinta el titulo en un <h3> y el
//           mensaje en un <p>.
//   - TXT:  léelo con .text() y píntalo con textContent.
//   - HTML: léelo con .text() y píntalo con innerHTML.
//   - XML:  léelo con .text(), conviértelo con
//           new DOMParser().parseFromString(texto, 'application/xml')
//           y saca <titulo> y <mensaje> con querySelector.
//           Píntalos como en el JSON.
// Termina cada cadena con un catch que pinte el mensaje del error
// en la caja.
// ---------------------------------------------------------------------

function cargarJson() {
  fetch('data/contenido.json')
    .then(respuesta => respuesta.json())
    .then(datos => {
      const caja = document.querySelector('#json');
      // Creamos los elementos para mostrar el título y el mensaje.
      const titulo = document.createElement('h3');
      titulo.textContent = datos.titulo;

      const mensaje = document.createElement('p');
      mensaje.textContent = datos.mensaje;

      caja.innerHTML = '';
      caja.append(titulo, mensaje);
    })
    .catch(error => {
      document.querySelector('#json').textContent = error.message;
    });
}

function cargarTxt() {
  fetch('data/contenido.txt')
    .then(respuesta => respuesta.text())
    .then(texto => {
      // Mostramos el contenido del archivo como texto.
      document.querySelector('#txt').textContent = texto;
    })
    .catch(error => {
      document.querySelector('#txt').textContent = error.message;
    });
}

function cargarHtml() {
  fetch('data/contenido.html')
    .then(respuesta => respuesta.text())
    .then(texto => {
      // Usamos innerHTML para que se interpreten las etiquetas HTML.
      document.querySelector('#html').innerHTML = texto;
    })
    .catch(error => {
      document.querySelector('#html').textContent = error.message;
    });
}

function cargarXml() {
  fetch('data/contenido.xml')
    .then(respuesta => respuesta.text())
    .then(texto => {
      // Convertimos el texto recibido en un documento XML.
      const xml = new DOMParser().parseFromString(
        texto,
        'application/xml'
      );
      // Buscamos las etiquetas que necesitamos dentro del XML.
      const tituloTexto = xml.querySelector('titulo').textContent;
      const mensajeTexto = xml.querySelector('mensaje').textContent;

      const caja = document.querySelector('#xml');

      const titulo = document.createElement('h3');
      titulo.textContent = tituloTexto;

      const mensaje = document.createElement('p');
      mensaje.textContent = mensajeTexto;

      caja.innerHTML = '';
      caja.append(titulo, mensaje);
    })
    .catch(error => {
      document.querySelector('#xml').textContent = error.message;
    });
}

// ---------------------------------------------------------------------
// EJERCICIO 4.3 · Piensa y prueba
// Responde en los comentarios. Para la c) y la d), cambia el código del
// 4.2, prueba y después déjalo como estaba.
// ---------------------------------------------------------------------

// a) ¿Por qué hacen falta DOS then para tener
//    los datos de un fetch?
//    Porque el primer then recibe la respuesta y el segundo obtiene los datos usando json() o text().
// b) Hay respuesta.json() y respuesta.text(), pero no respuesta.xml().
//    ¿Cómo leemos entonces un XML?
//    Lo leemos como texto con text() y después lo convertimos a XML usando DOMParser.
// c) En cargarJson, cambia la ruta por 'data/contenido.txt'.
//    ¿Qué error sale? ¿En qué paso falla: en el fetch o en el .json()?
//    Da un error porque el archivo TXT no tiene formato JSON. Falla en el .json(), no en el fetch.
// d) En cargarHtml, cambia innerHTML por textContent. ¿Qué cambia?
//    ¿Por qué es peligroso usar innerHTML con HTML que no es nuestro?
//    Con textContent se muestra el código HTML como texto, mientras que con innerHTML se muestran las etiquetas interpretadas.
//    Es peligroso usar innerHTML con HTML que no conocemos porque puede contener código malicioso.

// ---------------------------------------------------------------------
// EJERCICIO 4.4 · Los errores de fetch
// a) Escribe la función pedir(url, formato). Debe DEVOLVER (return)
//    la promesa del fetch con un then que:
//    - si respuesta.ok es false, lance un error:
//        throw new Error(`Error ${respuesta.status} en ${url}`)
//    - si formato es 'json', devuelva respuesta.json();
//      si no, devuelva respuesta.text()
//    Así, quien la use recibe los datos ya leídos en un solo then:
//      pedir('data/contenido.json', 'json').then(datos => ...)
// b) Completa probarErrores: usa pedir con 'data/noexiste.json' y,
//    en el catch, pinta el mensaje del error en #errores.
// c) Quita el if de pedir y vuelve a probar. ¿Qué pasa ahora?
//    ¿Por qué fetch no falla solo con un 404?
// A partir de aquí, usa pedir en los demás ejercicios.
// ---------------------------------------------------------------------

// Esta función pide un archivo, comprueba si ha habido algún error y devuelve su contenido según el formato que le indiquemos.
function pedir(url, formato) {
  return fetch(url)
    .then(respuesta => {
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status} en ${url}`);
      }

      if (formato === 'json') {
        return respuesta.json();
      } else {
        return respuesta.text();
      }
    });
}

function probarErrores() {
  pedir('data/noexiste.json', 'json')
    .then(datos => {
      console.log(datos);
    })
    .catch(error => {
      document.querySelector('#errores').textContent = error.message;
    });
}

// Respuesta c):
// Si quitamos el if, no sale el error 404 y la petición sigue funcionando aunque el archivo no exista.
// Por eso tenemos que comprobar respuesta.ok.


// ---------------------------------------------------------------------
// EJERCICIO 4.5 · Los mismos alumnos en dos formatos
// data/alumnos.json y data/alumnos.xml tienen los mismos 4 alumnos.
// Las dos primeras funciones no pintan nada: DEVUELVEN una promesa
// que se cumple con el array de alumnos (usa pedir y un then).
// a) cargarAlumnosJson(): promesa del array de alumnos del JSON.
//    Mira cómo es el archivo: los alumnos están dentro de "clase".
// b) cargarAlumnosXml(): promesa de un array con LA MISMA FORMA
//    { nombre, apellido, edad, curso }. Recorre los <alumno> con
//    querySelectorAll. Ojo: en el XML todo es texto, así que la edad
//    hay que pasarla a número con Number().
// c) mostrarAlumnos(): pide los dos A LA VEZ con Promise.all y añade a
//    #alumnos una tabla de cada uno con pintarTabla(alumnos, titulo).
//    Muestra por consola si los dos tienen el mismo número de alumnos.
// ¿Con qué formato ha sido más fácil? ¿Por qué crees que casi todas
// las APIs usan JSON?
// ---------------------------------------------------------------------

function cargarAlumnosJson() {
  return pedir('data/alumnos.json', 'json')
    .then(datos => {
      // Los alumnos están guardados dentro de la propiedad clase.
      return datos.clase;
    });
}

function cargarAlumnosXml() {
  return pedir('data/alumnos.xml', 'text')
    .then(texto => {
      // Convertimos el texto en XML para poder buscar sus etiquetas.
      const xml = new DOMParser().parseFromString(
        texto,
        'application/xml'
      );
      // Creamos un array vacío para guardar los alumnos.
      const alumnos = [];
      const elementos = xml.querySelectorAll('alumno');
      // Recorremos los alumnos y guardamos sus datos como objetos.
      elementos.forEach(alumno => {
        alumnos.push({
          nombre: alumno.querySelector('nombre').textContent,
          apellido: alumno.querySelector('apellido').textContent,
          edad: Number(alumno.querySelector('edad').textContent),
          curso: alumno.querySelector('curso').textContent
        });
      });

      return alumnos;
    });
}

function mostrarAlumnos() {
  // Promise.all espera a que terminen las dos peticiones.
  Promise.all([
    cargarAlumnosJson(),
    cargarAlumnosXml()
  ])
    .then(resultados => {
      const alumnosJson = resultados[0];
      const alumnosXml = resultados[1];

      const caja = document.querySelector('#alumnos');
      caja.innerHTML = '';
      // Mostramos una tabla con los alumnos de cada formato.
      caja.append(
        pintarTabla(alumnosJson, 'Alumnos JSON'),
        pintarTabla(alumnosXml, 'Alumnos XML')
      );
      // Comprobamos si los dos archivos tienen el mismo número de alumnos.
      console.log(
        'Tienen el mismo número de alumnos:',
        alumnosJson.length === alumnosXml.length
      );
    })
    .catch(error => {
      console.log(error.message);
    });
}

// ¿Qué formato ha sido más fácil y por qué?
// JSON ha sido más fácil porque los datos se obtienen directamente y no hay que buscar las etiquetas una por una como en XML.
// Por eso es más cómodo trabajar con JSON en JavaScript.


// ---------------------------------------------------------------------
// EJERCICIO 4.6 · Informe de carga (ampliación)
// Quieres comprobar qué archivos se cargan bien. Pide estos cinco A LA
// VEZ con pedir, cada uno con su formato:
//   'data/contenido.json' json      'data/contenido.txt'  text
//   'data/contenido.xml'  text      'data/noexiste.json'  json
//   'data/contenido.txt'  json   ← este fallará: ¿por qué?
// Usa el combinador que espera a TODAS aunque alguna falle (sesión 3).
// Pinta en #informe una lista <ul> con una línea por archivo:
//   ✔ data/contenido.json          (clase ok)
//   ✘ data/noexiste.json: Error 404 en data/noexiste.json   (clase error)
// ---------------------------------------------------------------------
function informe() {
  // Guardamos las rutas y los formatos de los archivos que vamos a pedir.
  const archivos = [
    ['data/contenido.json', 'json'],
    ['data/contenido.txt', 'text'],
    ['data/contenido.xml', 'text'],
    ['data/noexiste.json', 'json'],
    ['data/contenido.txt', 'json']
  ];

  const promesas = archivos.map(archivo => {
    return pedir(archivo[0], archivo[1]);
  });
  // Esperamos a que terminen todas las peticiones, aunque alguna falle.
  Promise.allSettled(promesas)
    .then(resultados => {
      const lista = document.createElement('ul');
      // Comprobamos cuáles han funcionado y cuáles han dado error.
      resultados.forEach((resultado, i) => {
        const elemento = document.createElement('li');

        if (resultado.status === 'fulfilled') {
          elemento.textContent = `✔ ${archivos[i][0]} (${archivos[i][1]})`;
          elemento.classList.add('ok');
        } else {
          elemento.textContent = `✘ ${archivos[i][0]} (${archivos[i][1]}): ${resultado.reason.message}`;
          elemento.classList.add('error');
        }

        lista.append(elemento);
      });

      const caja = document.querySelector('#informe');
      caja.innerHTML = '';
      caja.append(lista);
    });
}
// La última petición falla porque intenta leer un archivo TXT como JSON.
// fetch funciona, pero respuesta.json() falla porque el contenido del archivo no tiene un formato JSON válido.