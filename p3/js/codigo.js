function inicio(){

  
        var tabla=document.getElementById("tabla_ultimos");
        var seccion_tabla=document.getElementById("tabla_mensaje");
    if(sessionStorage.getItem("jugador1")){
        window.location.href="juego.html";
    }else{
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

        }else{
            var text="Todavía no hay puntuaciones guardadas. ¡¡¡Sé el primero en conseguir una puntuación máxima!!!";
            var textNode = document.createTextNode(text);
            seccion_tabla.appendChild(textNode);
            
        }
    }
    if(sessionStorage.getItem('jugador1')){
        window.location.href='juego.html';
    }
}
function pruebas(){
    // Crear un array de objetos JSON
var jugadores = [
    {
      nombre: "Juan",
      puntuacion: 100,
    },
    {
      nombre: "María",
      puntuacion: 90,
    },
    {
      nombre: "Carlos",
      puntuacion: 80,
    },
    {
        nombre: "Juan10",
        puntuacion: 95,
    },
    {
        nombre: "María2",
        puntuacion: 75,
      },
      {
        nombre: "Carlos5",
        puntuacion: 80,
      },
      {
        nombre: "Pedro",
        puntuacion: 1,
      },
      {
        nombre: "Laura",
        puntuacion: 99,
      },
      {
        nombre: "Pablo",
        puntuacion: 5,
      },
      {
        nombre: "Carlos8",
        puntuacion: 80,
      },
      {
        nombre: "Jose",
        puntuacion: 1,
      },
      {
        nombre: "Vicente",
        puntuacion: 99,
      },
      {
        nombre: "Mario",
        puntuacion: 35,
      }
  ];
  
  // Convertir el array en una cadena JSON
  var jugadoresJSON = JSON.stringify(jugadores);
  
  // Guardar la cadena JSON en sessionStorage
  sessionStorage.setItem("puntuaciones", jugadoresJSON);
}
function start(){
    let jugador1=document.getElementById("player1").value;
    let jugador2=document.getElementById("player2").value;
    console.log(jugador1 + jugador2)
    sessionStorage.setItem('jugador1', jugador1);
    sessionStorage.setItem('jugador2', jugador2);
}

function volver(){
    if(sessionStorage.getItem('jugador1')){
        window.location.href="juego.html";
    }else window.location.href="index.html";
}

/* --------------- JUEGO.HTML --------------- */
function cargar(){
    if(!sessionStorage.getItem('jugador1')){
        window.location.href = 'index.html';
    }
    else{
        getTablero();
    }
}

function getTablero(){
    var url = `./api/tablero`;
    
    fetch(url)
    .then(function(res){
        if(res.ok){
                res.json().then(function(data) {
                    console.log(data);
                    let numero, numeros = [];
                    
                    //Genera los 3 nº aleatorios para empezar (- el 5)
                    for(let i=0; i<3; i++){
                        do 
                            numero = Math.floor(Math.random()*9) + 1;
                        while(numero == 5);
                        numeros[i] = numero;
                    }
                    console.log(numeros);

                    /* let html = ''; 
                    data.FILAS.forEach(e => {
                        console.log(e);
                        html +=`<div>
                                    <img src="fotos/pubs/${e.archivo}" alt="Foto ${e.autor}">
                                    <p>${e.descripcion}</p>
                                </div>`;
                    });
                    galeria.insertAdjacentHTML("beforeend", html); */
                });
            }
        }).catch(function(err) { 
        console.log('Fetch Error: ' + err);
    });
}