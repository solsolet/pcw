function inicio(){ 
    var tabla = document.getElementById("tabla_ultimos");
    var seccion_tabla = document.getElementById("tabla_mensaje");

    if(sessionStorage.getItem("partida")){
        window.location.href = "juego.html";
    } else{
        if(sessionStorage.getItem("puntuaciones")){
    
            var tabla = document.getElementById("tabla_ultimos");
            // Obtener el array de jugadores desde sessionStorage
            var puntuacionesJSON = sessionStorage.getItem("puntuaciones");
            var puntuaciones = JSON.parse(puntuacionesJSON);

            // Ordenar el array por puntuación de forma descendente
            puntuaciones.sort(function(a, b) {
                return b.puntuacion - a.puntuacion;
            });

            // Mostrar solo los 10 primeros jugadores con mayor puntuación
            var cantidadJugadores = Math.min(puntuaciones.length, 10);

            for (var i = 0; i < cantidadJugadores || i < puntuaciones.lenght; i++) {
                var jugador = puntuaciones[i];

                // Crear una nueva fila en la tabla
                var fila = document.createElement("tr");

                // Crear las celdas de posición, nombre y puntuación
                var celdaPosicion = document.createElement("td");
                celdaPosicion.textContent = i + 1;
                fila.appendChild(celdaPosicion);

                var celdaNombre = document.createElement("td");
                celdaNombre.textContent = jugador.nombre;
                fila.appendChild(celdaNombre);

                var celdaPuntuacion = document.createElement("td");
                celdaPuntuacion.textContent = jugador.puntuacion;
                fila.appendChild(celdaPuntuacion);

                // Agregar la fila a la tabla
                tabla.appendChild(fila);
            }
            var puntuacionesJSONnew = JSON.stringify(puntuaciones);

        // Guardar el nuevo JSON en sessionStorage
        sessionStorage.setItem("puntuaciones", puntuacionesJSONnew)
                
        } else{
            var text = "Todavía no hay puntuaciones guardadas. ¡¡¡Sé el primero en conseguir la máxima puntuación!!!";
            var textNode = document.createTextNode(text);
            seccion_tabla.appendChild(textNode);
        }
    }
    if(sessionStorage.getItem('partida')){
        window.location.href = 'juego.html';
    }
}

function start(){
    let jugador1 = document.getElementById("player1").value;
    let jugador2 = document.getElementById("player2").value;
    console.log(jugador1 + jugador2)
    sessionStorage.setItem('jugador1', jugador1);
    sessionStorage.setItem('jugador2', jugador2);
    sessionStorage.setItem('partida', JSON.stringify({ estado: "iniciando" }));
}

function volver(){
    if(sessionStorage.getItem('jugador1')){
        window.location.href = "juego.html";
    } else window.location.href = "index.html";
}