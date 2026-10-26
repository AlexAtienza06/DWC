// =====================================================================
// EJERCICIO 1.4 · Semáforo con callbacks
// Abre semaforo.html en el navegador para ver el resultado.
//
// 1. Crea cambiarColor(color, ms, callback), que:
//      - pinte el fondo del círculo con ese color
//        (semaforo.style.background = color)
//      - y llame a callback pasados ms milisegundos (usa setTimeout)
//
// 2. Úsala para que el semáforo pase de:
//      verde ('green') 3 s  →  ámbar ('orange') 1 s  →  rojo ('red') 3 s
//    y vuelva a empezar.
// =====================================================================
const semaforo = document.getElementById('semaforo');
function cambiarColor(color, ms, callback) {
    semaforo.style.background = color;

    setTimeout(callback, ms);
}

function iniciarSemaforo() {
    cambiarColor('green', 3000, function () {
        cambiarColor('orange', 1000, function () {
            cambiarColor('red', 3000, function () {
                iniciarSemaforo();
            });
        });
    });
}

iniciarSemaforo();

// 3. Fíjate en la forma que toma tu código.
// ¿Cómo quedaría con diez colores?
// Con diez colores, el código quedaría con muchos callbacks anidados, haciendo que sea más difícil de leer y mantener.
// Esto se conoce como callback hell.