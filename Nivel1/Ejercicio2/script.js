//Guardar el estilo de la tabla en una variable
const formato = "color: blue; font-size: 12px;";

//Crear la tabla
const tabla = document.createElement("table");

tabla.setAttribute("border", "1");
tabla.setAttribute("style", formato);

//Primera fila
const filaUno = document.createElement("tr");
const columnaUno = document.createElement("td");

columnaUno.textContent = "Primera fila";

filaUno.appendChild(columnaUno);
tabla.appendChild(filaUno);

//Segunda fila
const filaDos = document.createElement("tr");
const columnaDos = document.createElement("td");

columnaDos.textContent = "Segunda fila";

filaDos.appendChild(columnaDos);
tabla.appendChild(filaDos);

//Añadir la tabla a la página
document.getElementById("contenedor").appendChild(tabla);