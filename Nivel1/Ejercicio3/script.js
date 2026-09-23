//Esperar a que se pulse el botón
document.getElementById("sumar").onclick = function() {

    //Recoger los datos introducidos
    const valor1 = document.getElementById("dato1").value;
    const valor2 = document.getElementById("dato2").value;

    //Convertir los datos a números
    const numero1 = Number(valor1);
    const numero2 = Number(valor2);

    //Calcular la suma
    const resultado = numero1 + numero2;

    //Mostrar el resultado
    alert("El resultado de la suma es: " + resultado);
};