//Programar el botón
document.getElementById("cambiar").onclick = function() {

    //Obtener las medidas introducidas
    const ancho = document.getElementById("medidaAncho").value;
    const alto = document.getElementById("medidaAlto").value;

    //Buscar la imagen
    const foto = document.getElementById("foto");

    //Cambiar sus dimensiones
    foto.width = ancho;
    foto.height = alto;
};