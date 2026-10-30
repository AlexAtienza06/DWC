// =====================================================================
// EJERCICIO 2.6 · Adiós, pirámide: el semáforo con promesas
// Abre semaforo.html en el navegador para ver el resultado.
//
// Rehaz el semáforo del ejercicio 1.4 (verde 3 s → ámbar 1 s → rojo 3 s,
// y vuelta a empezar), pero ahora con promesas:
//
// 1. Copia aquí tu función esperar(ms) del ejercicio 2.5.
// 2. Crea color(c, ms), que pinte el círculo con el color c
//    y DEVUELVA esperar(ms).
// 3. Encadena los tres colores con then, sin meter un then dentro de otro.
//
// Compara la forma del código con la de tu versión del ejercicio 1.4.
// =====================================================================
// Tu código aquí:

// Seleccionamos el círculo del semáforo para poder cambiar su color
const semaforo = document.getElementById('semaforo');

// Función que espera los milisegundos indicados.
function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

// Cambiamos el color y esperamos el tiempo indicado.
function color(c, ms) {
  semaforo.style.background = c;
  return esperar(ms);
}

// Encadenamos los colores del semáforo, verde, naranja y rojo, y repetimos el ciclo.
function cambiarSemaforo() {
  color('green', 3000)
    .then(() => {
      return color('yellow', 1000);
    })
    .then(() => {
      return color('red', 3000);
    })
    .then(() => {
      cambiarSemaforo();
    });
}

// Iniciamos el semáforo.
cambiarSemaforo();