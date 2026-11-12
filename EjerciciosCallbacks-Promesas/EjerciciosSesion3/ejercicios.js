// =====================================================================
// SESIÓN 3 · COMBINAR PROMESAS · Ejercicios 3.1, 3.2 y 3.4
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 3.3, la tienda, está en la carpeta tienda/)
//
// OJO: cuando acabes un ejercicio, coméntalo (Ctrl + /) antes de pasar
// al siguiente, para que los mensajes no se mezclen.
// =====================================================================


// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------
// esperar(ms): promesa que se cumple pasados ms milisegundos
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));

// tarea(nombre, ms, falla): promesa que tarda ms milisegundos.
// Si falla es true, se rechaza; si no, se cumple con el nombre.
const tarea = (nombre, ms, falla = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (falla) reject(new Error(nombre + ' ha fallado'));
    else resolve(nombre);
  }, ms);
});
// ------------------------------------------------------------------------
// ---------------------------------------------------------------------
// EJERCICIO 3.1 · ¿En serie o en paralelo?
// Lanza tres tareas de 1000 ms:
//   a) primero encadenadas con then (una detrás de otra)
//   b) después todas a la vez con Promise.all
// Mide el tiempo de cada versión con console.time('nombre') al empezar
// y console.timeEnd('nombre') al terminar.
// ¿Cuánto tarda cada una y por qué?
// ---------------------------------------------------------------------

// Tu código aquí:
// a) Primero hago las tareas una detrás de otra
console.time('Serie');

tarea('Tarea 1', 1000)
  .then(() => tarea('Tarea 2', 1000))
  .then(() => tarea('Tarea 3', 1000))
  .then(() => {
    console.timeEnd('Serie');
  });


// b) Ahora hago las tres tareas a la vez
console.time('Paralelo');

Promise.all([
  tarea('Tarea 1', 1000),
  tarea('Tarea 2', 1000),
  tarea('Tarea 3', 1000)
]).then(() => {
  console.timeEnd('Paralelo');
});

// Cuánto tarda cada una y por qué:
// La primera tarda unos 3 segundos porque las tareas van una detrás de otra.
// La segunda tarda unos 1 segundo porque se hacen todas al mismo tiempo.

// ---------------------------------------------------------------------
// EJERCICIO 3.2 · Elige el combinador
// Para cada situación, escribe qué método usarías
// (Promise.all, Promise.allSettled, Promise.race o Promise.any) y por qué.
// No hace falta programar nada: responde en los comentarios.
// ---------------------------------------------------------------------

// a) Necesito el usuario, sus pedidos y su carrito para pintar la página.
//    Método: Promise.all  Por qué: Porque necesito que todas las tareas terminen bien para tener todos los datos.
//
// b) Quiero cancelar si el servidor tarda más de 3 segundos.
//    Método: Promise.race  Por qué: Porque así puedo comparar el tiempo del servidor con el límite de 3 segundos.
//
// c) Envío 5 correos y quiero saber cuáles han fallado.
//    Método: Promise.allSettled  Por qué: Porque quiero saber cuáles han terminado bien y cuáles han fallado.

// d) Tengo tres servidores con los mismos datos y me vale el primero
//    que responda bien.
//    Método: Promise.any  Por qué: Porque me sirve con que uno de los servidores responda correctamente.

// ---------------------------------------------------------------------
// EJERCICIO 3.4 · Timeout (ampliación, para quien termine la tienda)
// Escribe conTimeout(promesa, ms), que devuelva una promesa que se
// rechace con new Error('Tiempo agotado') si promesa no termina en ms
// milisegundos. Pista: combina Promise.race con esperar.
// Pruébala con:
//   conTimeout(tarea('Rápida', 500), 1000)  → debe cumplirse con 'Rápida'
//   conTimeout(tarea('Lenta', 2000), 1000)  → debe fallar: Tiempo agotado
//
// Después, úsala en la tienda (lo explica el final de tienda.js).
// ---------------------------------------------------------------------

// Tu código aquí:
// Creo una función para poner un tiempo máximo a una promesa
const conTimeout = (promesa, ms) => {
  return Promise.race([
    promesa,
    esperar(ms).then(() => {
      throw new Error('Tiempo agotado');
    })
  ]);
};


// Pruebo con una tarea que tarda menos del tiempo permitido
conTimeout(tarea('Rápida', 500), 1000)
  .then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.log(error.message);
  });


// Pruebo con una tarea que tarda más del tiempo permitido
conTimeout(tarea('Lenta', 2000), 1000)
  .then(resultado => {
    console.log(resultado);
  })
  .catch(error => {
    console.log(error.message);
  });