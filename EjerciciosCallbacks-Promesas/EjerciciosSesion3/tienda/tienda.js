// =====================================================
// EJERCICIO 3.3 · TIENDA SIMULADA
// Tienes disponibles (en api.js):
//   obtenerProductos()  → Promise<[{ id, nombre, precio }, ...]>
//   obtenerStock(id)    → Promise<{ id, unidades }>
// Ambas fallan a veces. Completa los TODO.
// =====================================================

// Espero el tiempo indicado
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));

// Pongo un tiempo máximo para que termine una promesa
const conTimeout = (promesa, ms) => {
  return Promise.race([
    promesa,
    esperar(ms).then(() => {
      throw new Error('Tiempo agotado');
    })
  ]);
};

const cargando = document.getElementById('cargando');
const error = document.getElementById('error');
const mensajeError = document.getElementById('mensajeError');
const lista = document.getElementById('listaProductos');
const btnReintentar = document.getElementById('btnReintentar');

const mostrar = elemento => elemento.classList.remove('oculto');
const ocultar = elemento => elemento.classList.add('oculto');

// Pinta un producto en la lista
function pintarProducto(producto, unidades) {
  const li = document.createElement('li');
  const nombre = document.createElement('span');
  nombre.textContent = `${producto.nombre} · ${producto.precio.toFixed(2)} €`;
  const stock = document.createElement('span');
  stock.textContent = unidades > 0 ? `${unidades} uds.` : 'Agotado';
  if (unidades === 0) stock.classList.add('agotado');
  li.append(nombre, stock);
  lista.append(li);
}

function cargarTienda() {
  // Vacío la lista y muestro que está cargando
  lista.innerHTML = '';
  ocultar(error);
  mostrar(cargando);

  // Pido los productos al servidor
  conTimeout(obtenerProductos(), 2000)
    .then(productos => {

      // Pido el stock de todos los productos al mismo tiempo
      return conTimeout(Promise.all(
        productos.map(p => obtenerStock(p.id))
      ), 2000).then(stocks => {

        // Recorro los productos y los muestro con su stock
        productos.forEach((producto, i) => {
          pintarProducto(producto, stocks[i].unidades);
        });

      });
    })
    .catch(err => {
      // Si ocurre algún error, muestro el mensaje
      mensajeError.textContent = err.message;
      mostrar(error);
    })
    .finally(() => {
      // Oculto el mensaje de carga cuando termina
      ocultar(cargando);
    });
}

// Vuelvo a cargar la tienda cuando pulso el botón
btnReintentar.addEventListener('click', cargarTienda);

cargarTienda();