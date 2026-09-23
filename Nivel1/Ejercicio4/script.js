//Acción del botón
document.getElementById("mostrar").onclick = function() {

    //Recoger los datos de los inputs
    const texto1 = document.getElementById("dato1").value;
    const texto2 = document.getElementById("dato2").value;

    //Crear la tabla
    const tabla = document.createElement("table");
    tabla.setAttribute("border", "1");

    //Crear la primera fila
    const fila1 = document.createElement("tr");

    const tipo1 = document.createElement("td");
    tipo1.innerHTML = "Dato 1";

    const valor1 = document.createElement("td");
    valor1.innerHTML = texto1;

    fila1.appendChild(tipo1);
    fila1.appendChild(valor1);
    tabla.appendChild(fila1);

    //Crear la segunda fila
    const fila2 = document.createElement("tr");

    const tipo2 = document.createElement("td");
    tipo2.innerHTML = "Dato 2";

    const valor2 = document.createElement("td");
    valor2.innerHTML = texto2;

    fila2.appendChild(tipo2);
    fila2.appendChild(valor2);
    tabla.appendChild(fila2);

    //Vaciar el contenido anterior
    document.getElementById("resultado").innerHTML = "";

    //Mostrar la tabla
    document.getElementById("resultado").appendChild(tabla);
};