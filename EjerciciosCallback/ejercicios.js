// =====================================================================
// SESIÓN 1 · CALLBACKS · Ejercicios 1.1, 1.2 y 1.3
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 1.4 está en semaforo.js)
// =====================================================================

// ---------------------------------------------------------------------
// EJERCICIO 1.1 · De función clásica a flecha
// Reescribe cada función como función flecha, en la forma más corta
// posible. Cambia los nombres para que no se repitan (cuadrado2, etc.)
// y comprueba con console.log que dan el mismo resultado.
// ---------------------------------------------------------------------
function cuadrado(x) { return x * x; }
function saludo(nombre, hora) { return 'Buenas ' + hora + ', ' + nombre; }
function crearPunto(x, y) { return { x: x, y: y }; }
function aleatorio() { return Math.random(); }

// Tu código aquí:
const cuadrado2 = x => x * x;

const saludo2 = (nombre, hora) => 'Buenas ' + hora + ', ' + nombre;

const crearPunto2 = (x, y) => ({ x: x, y: y });

const aleatorio2 = () => Math.random();

// Pruebas
console.log(cuadrado(5), cuadrado2(5));
console.log(saludo('Ana', 'tarde'), saludo2('Ana', 'tarde'));
console.log(crearPunto(3, 4), crearPunto2(3, 4));
console.log(aleatorio(), aleatorio2());

// ---------------------------------------------------------------------
// EJERCICIO 1.2 · Mi propio forEach y mi propio filter
// Vas a escribir tus propias versiones de forEach y filter.
// Recuerda la función repetir que hemos visto en clase:
//
//   const repetir = (veces, fn) => {
//     for (let i = 0; i < veces; i++) {
//       fn(i);
//     }
//   };
//
// Usaremos estos dos arrays:
const frutas = ['manzana', 'pera', 'uva'];
const numeros = [3, 8, 1, 12];

// ----- a) miForEach(array, callback) -----
// Debe hacer lo mismo que frutas.forEach(...): recorrer el array y,
// en cada vuelta, llamar al callback pasándole el elemento y su posición.
//
//   Paso 1. Dentro, escribe un for que recorra el array
//           (i desde 0 hasta array.length - 1).
//   Paso 2. En cada vuelta, llama al callback con DOS argumentos:
//           el elemento (array[i]) y su posición (i).
//
// Pista: es como repetir, pero con array.length en lugar de veces,
// y callback(array[i], i) en lugar de fn(i).
// No hace falta return: el callback ya hace el trabajo (imprimir).

const miForEach = (array, callback) => {
  // Tu código aquí
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
};

// Prueba
miForEach(frutas, (fruta, i) => console.log(i + ': ' + fruta));

// Salida esperada:
//   0: manzana
//   1: pera
//   2: uva

// ----- b) miFilter(array, condicion) -----
// Debe hacer lo mismo que numeros.filter(...): DEVOLVER un array nuevo
// solo con los elementos que cumplen la condición.
// condicion es un callback que recibe un elemento y DEVUELVE true o false.
//
//   Paso 1. Crea un array vacío: const resultado = [];
//   Paso 2. Recorre el array (con un for o con tu miForEach).
//   Paso 3. Para cada elemento, llama a condicion(elemento).
//           Si devuelve true, añádelo con resultado.push(elemento).
//   Paso 4. Al final, devuelve resultado con return.
//
// Aquí SÍ hace falta return: quien llama a miFilter quiere el array.

const miFilter = (array, condicion) => {
  const resultado = [];
  miForEach(array, (elemento, i) => {
    if (condicion(elemento)) {
      resultado.push(elemento);
    }
  });
  return resultado;
};

// Pruebas (quita las // cuando tengas la función):
console.log(miFilter(numeros, n => n > 5));         // [ 8, 12 ]
console.log(miFilter(frutas, f => f.length > 4));   // [ 'manzana' ]

// ---------------------------------------------------------------------
// EJERCICIO 1.3 · Predice el orden
// ANTES de ejecutar, escribe en el comentario de abajo en qué orden
// crees que saldrán los números. Luego quita el /* y el */ y ejecuta.
// Explica con tus palabras por qué forEach no espera y
// setTimeout(..., 0) sí.
// ---------------------------------------------------------------------

// Mi predicción: Primero saldrá el 1, después el 4, luego el 5 y el 6. 
// Después saldrá el 3 y, por último, el 2.
// Mi explicación:
// Los console.log normales se ejecutan directamente, por lo que el 1 y el 4 salen primero.
// El forEach recorre el array y ejecuta el callback en cada vuelta, por eso el 5 y el 6 salen después del 4. 
// El setTimeout deja el código preparado para ejecutarse más tarde, aunque tenga un tiempo de 0 milisegundos.
// Por eso, los números 2 y 3 salen después de los demás, y concretemente el 3 sale antes que el 2 porque tiene un tiempo menor.
console.log('1');
setTimeout(() => console.log('2'), 100);
setTimeout(() => console.log('3'), 0);
console.log('4');
[5, 6].forEach(n => console.log(n));