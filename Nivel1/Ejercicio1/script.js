//Crear la tabla
const tabla = document.createElement("table");
tabla.setAttribute("border", "1");

//Crear la primera fila
const filaUno = document.createElement("tr");
const columnaUno = document.createElement("td");

columnaUno.textContent = "Primera fila";

filaUno.appendChild(columnaUno);
tabla.appendChild(filaUno);

//Crear la segunda fila
const filaDos = document.createElement("tr");
const columnaDos = document.createElement("td");

columnaDos.textContent = "Segunda fila";

filaDos.appendChild(columnaDos);
tabla.appendChild(filaDos);

//Mostrar la tabla
const contenedor = document.getElementById("contenedor");
contenedor.appendChild(tabla);