// =====================================================================
// SESIÓN 2 · PROMESAS · Ejercicios 2.1, 2.2, 2.3, 2.4, 2.5 y 2.7
// Escribe tu código debajo de cada enunciado.
// Para ejecutarlo: node ejercicios.js
// (El ejercicio 2.6 está en semaforo.js)
//
// OJO: estos ejercicios tardan en terminar, así que sus mensajes se
// pueden mezclar en la consola. Cuando acabes uno, coméntalo
// (selecciónalo y pulsa Ctrl + /) antes de pasar al siguiente.
// =====================================================================
// ---------- Código que ya tienes hecho (no hace falta tocarlo) ----------

// Para el ejercicio 2.1
function hervirAgua(litros) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (litros > 0) resolve('Agua hirviendo: ' + litros + ' litros');
      else reject(new Error('No hay agua en la olla'));
    }, 3000);
  });
}

// Para el ejercicio 2.4
function pedirPizza(tipo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (tipo === 'piña') reject(new Error('No hacemos pizza con piña'));
      else resolve('Pizza ' + tipo);
    }, 1000);
  });
}

function hornearPizza(pizza) {
  return new Promise(resolve => {
    setTimeout(() => resolve(pizza + ' horneada'), 1000);
  });
}
// ------------------------------------------------------------------------


// ---------------------------------------------------------------------
// EJERCICIO 2.1 · Usar una promesa ya hecha
// La función hervirAgua (arriba) ya está hecha y devuelve una promesa.
// Úsala con then, catch y finally:
//   - con 2 litros debe salir el mensaje de éxito
//   - con 0 litros debe salir el error
//   - en los dos casos, al final debe salir «Fuego apagado»
// ---------------------------------------------------------------------
// Tu código aquí:

// Probamos la función con 2 litros de agua
hervirAgua(2)
  .then(mensaje => {
    // Si la promesa se cumple, mostramos el mensaje de éxito
    console.log(mensaje);
  })
  .catch(error => {
    // Si ocurre un error, mostramos el mensaje correspondiente
    console.log(error.message);
  })
  .finally(() => {
    // Esto se ejecuta siempre, tanto si sale bien como si sale mal
    console.log('Fuego apagado');
  });

// Probamos la función con 0 litros de agua
hervirAgua(0)
  .then(mensaje => {
    // En este caso no debería ejecutarse porque no hay agua
    console.log(mensaje);
  })
  .catch(error => {
    // Mostramos el error porque la promesa se ha rechazado
    console.log(error.message);
  })
  .finally(() => {
    // Aunque haya ocurrido un error, el fuego se apaga igualmente
    console.log('Fuego apagado');
  });


// ---------------------------------------------------------------------
// EJERCICIO 2.2 · Mi primera promesa: lanzar una moneda
// Crea lanzarMoneda(), que devuelva una promesa que tarde 500 ms y:
//   - se cumpla (resolve) con 'cara', o
//   - se rechace (reject) con new Error('cruz'),
// cada caso con un 50 % de probabilidad (pista: Math.random() < 0.5).
// Consúmela con then, catch y finally, mostrando el resultado en la
// consola. Ejecútalo varias veces.
// Pista: copia la plantilla de pedirPizza y cambia lo de dentro.
// ---------------------------------------------------------------------
// Tu código aquí:

// Creamos una función que simula el lanzamiento de una moneda
function lanzarMoneda() {
  return new Promise((resolve, reject) => {
    // Esperamos medio segundo antes de obtener el resultado
    setTimeout(() => {
      // Generamos un número aleatorio para decidir el resultado
      if (Math.random() < 0.5) {
        // Si sale menor que 0.5, la moneda cae en cara
        resolve('cara');
      } else {
        // Si no, rechazamos la promesa indicando que ha salido cruz
        reject(new Error('cruz'));
      }
    }, 500);
  });
}

// Llamamos a la función para lanzar la moneda
lanzarMoneda()
  .then(resultado => {
    // Si sale cara, mostramos el resultado
    console.log('Resultado: ' + resultado);
  })
  // Si sale cruz, mostramos el mensaje de error
  .catch(error => {
    console.log('Resultado: ' + error.message);
  })
  .finally(() => {
    // Indicamos que el lanzamiento ha terminado
    console.log('Lanzamiento terminado');
  });

// ---------------------------------------------------------------------
// EJERCICIO 2.3 · Comprobar la edad
// Crea comprobarEdad(edad), que devuelva una promesa que tarde 1 segundo:
//   - si la edad es 18 o más, se cumple con 'Puede entrar'
//   - si no, se rechaza con new Error('Es menor de edad')
// Pruébala con 20 y con 15.
// ---------------------------------------------------------------------
// Tu código aquí:

// Comprobamos si una persona tiene la edad suficiente para entrar
function comprobarEdad(edad) {
  return new Promise((resolve, reject) => {
    // Esperamos un segundo antes de comprobar la edad
    setTimeout(() => {
      // Si la edad es 18 o más, podrá entrar.
      if (edad >= 18) {
        resolve('Puede entrar');
      } else {
        // Si es menor de edad, rechazamos la promesa con un error
        reject(new Error('Es menor de edad'));
      }
    }, 1000);
  });
}

// Probamos la función con una persona de 20 años
comprobarEdad(20)
  .then(mensaje => {
    // Mostramos que puede entrar
    console.log(mensaje);
  })
  .catch(error => {
    // Si hubiera algún error, mostramos su mensaje
    console.log(error.message);
  });

// Ahora, probamos la función con una persona de 15 años
comprobarEdad(15)
  .then(mensaje => {
    // Este mensaje no aparecerá porque es menor de edad
    console.log(mensaje);
  })
  .catch(error => {
    // Mostramos que no puede entrar por ser menor de edad
    console.log(error.message);
  });

// ---------------------------------------------------------------------
// EJERCICIO 2.4 · Encuentra el fallo
// Este código debería mostrar 'Pizza margarita horneada', pero muestra
// undefined. Quita el /* y el */, ejecútalo, explica por qué pasa
// y corrígelo.
// ---------------------------------------------------------------------
// Por qué falla: 
// El problema está en que llamamos a hornearPizza(pizza), pero no devolvemos su promesa con return.

pedirPizza('margarita')
  .then(pizza => {
    return hornearPizza(pizza);
  })
  .then(pizza => console.log(pizza));

// ---------------------------------------------------------------------
// EJERCICIO 2.5 · esperar(ms) y cuenta atrás
// Escribe esperar(ms), que devuelva una promesa que se cumpla pasados
// ms milisegundos. Úsala para mostrar 3, 2, 1 y ¡Ya!, con un segundo
// entre cada uno, ENCADENANDO then (un then debajo de otro, sin meter
// uno dentro de otro).
// ---------------------------------------------------------------------
// Tu código aquí:

// Creamos una función que espera el tiempo indicado en milisegundos
function esperar(ms) {
  return new Promise(resolve => {
    // Cuando pasa el tiempo indicado, se cumple la promesa
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
// Empezamos mostrando el número 3
console.log(3);
// Vamos encadenando los then para hacer la cuenta atrás
esperar(1000)
  .then(() => {
    // Después de un segundo mostramos el 2
    console.log(2);
    // Devolvemos otra espera para continuar la cuenta atrás
    return esperar(1000);
  })
  .then(() => {
    // Después de otro segundo mostramos el 1
    console.log(1);
    // Esperamos un segundo más antes de terminar
    return esperar(1000);
  })
  .then(() => {
    // Finalmente mostramos el mensaje de inicio
    console.log('¡Ya!');
  });

// ---------------------------------------------------------------------
// EJERCICIO 2.7 · Predice el orden (reto)
// ANTES de ejecutar, escribe tu predicción. Luego quita /* y */.
// ---------------------------------------------------------------------
// Mi predicción: Se mostrará en el siguiente orden: A, D, C y B.
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve('C').then(v => console.log(v));
console.log('D');