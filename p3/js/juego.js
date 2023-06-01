/* --------------- JUEGO.HTML --------------- */
function cargar(){

   

  if(!(sessionStorage.getItem('partida'))){
      window.location.href = 'index.html';
  }
  else{
      getTablero();
      sessionStorage.removeItem("seleccionada");
     
  }
}

function getTablero(){
  let iniciando= sessionStorage.getItem("partida");
  const iniciandoJSON = JSON.parse(iniciando);
  if(iniciandoJSON.estado=="iniciando"){
      var url = `./api/tablero`;

      fetch(url)
      .then(function(res){
          if(res.ok){
                  res.json().then(function(data) {
                      console.log(data);
                      console.log(data.TABLERO);
                      
                      let numero, numeros = [];
                      
                      //Genera los 3 nº aleatorios para empezar (- el 5)
                      for(let i=0; i<3; i++){
                          do 
                              numero = Math.floor(Math.random()*9) + 1;
                          while(numero == 5);
                          numeros[i] = numero;
                      }

                      
                      console.log(numeros);
                      //asignacion aleatoria de qué jugador empieza primero, si sale 0 comienza el jugador1 sino el jugador2. Se asigna el turno al primero.
                      var jug_primero;
                      const primero = Math.round(Math.random());
                      console.log(numero);
                    
                      if(primero==0){
                          jug_primero="jugador1";
                      }else{
                          jug_primero="jugador2";
                      }


                      var partida={
                          tablero:data.TABLERO,
                          jugador1:sessionStorage.getItem("jugador1"),
                          jugador2:sessionStorage.getItem("jugador2"),
                          puntuacion1: 0,
                          puntuacion2: 0,
                          turno:jug_primero,
                          numeros: numeros
                      }        
                      const partidaJSON = JSON.stringify(partida);        
                      sessionStorage.setItem("partida",partidaJSON);
                      actualizarmarcador(); 

                      console.log(partida);
                      siguiente_turno();
                      tablero();
                      fichas();
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

  }else{ console.log("Ya hay un tablero generado");
          siguiente_turno();
          actualizarmarcador();  
          tablero();
          fichas();
  }

}

function siguiente_turno(){
  let partidaJSON=sessionStorage.getItem("partida");
  const partida = JSON.parse(partidaJSON);
  console.log(partida);
  let dialogo = document.createElement('dialog'),
  html = '';
  var juega="jugador";
  if(partida.turno=="jugador1"){
      juega=partida.jugador1;
  }else{
      juega=partida.jugador2;
  }

      html +=`<h3>Siguiente turno</h3>,
          <p>Le toca a ${juega}</p>
          <button onclick="cerrarDialogo(0);" class="boton">Cerrar</button>`;
     

  dialogo.innerHTML = html;
  document.body.appendChild(dialogo);
  dialogo.showModal();
}

function cerrarDialogo(valor){
  console.log(valor);
  document.querySelector('dialog').close(); //en açò NOMÉS no es borra del html
  document.querySelector('dialog').remove(); //en açò si
}

function fin(){
  console.log("FIN DE PARTIDA");
  let partidaJSON=sessionStorage.getItem("partida");
  const partida = JSON.parse(partidaJSON);

  var nuevo1={
      nombre: partida.jugador1,
      puntuacion: partida.puntuacion1
  }
  var nuevo2={
      nombre: partida.jugador2,
      puntuacion: partida.puntuacion2
  }

  var puntuaciones= sessionStorage.getItem("puntuaciones");

  if(puntuaciones){
      let puntuacionesJSONs=JSON.parse(puntuaciones); 
      puntuacionesJSONs.push(nuevo1);
      puntuacionesJSONs.push(nuevo2);
      let puntuacionesJSONnew= JSON.stringify(puntuacionesJSONs);
      sessionStorage.setItem("puntuaciones", puntuacionesJSONnew);
  }else{
      var nuevos = [
          {
              nombre: partida.jugador1,
              puntuacion: partida.puntuacion1
          },
          {
              nombre: partida.jugador2,
              puntuacion: partida.puntuacion2
          }]
      let partidaJSONprimeros= JSON.stringify(nuevos);
      sessionStorage.setItem("puntuaciones", partidaJSONprimeros);
  }
  sessionStorage.removeItem("jugador1");
  sessionStorage.removeItem("jugador2");
  sessionStorage.removeItem("partida");
  window.location.href="index.html";
}

function ayuda(){
  let dialogo = document.createElement('dialog'),
  html = '';

      html +=`<h3>Ayuda</h3>,
          <p>El juego consiste en ir colocando en las casillas vacías del tablero los números que se proporcionan en grupos de tres. Juegan dos jugadores por turnos. Si al colocar un número en una celda vacía, sumándole el que tiene arriba/abajo/izquierda/derecha se obtiene un múltiplo de 5, se limpian las casillas correspondientes y el resultado de la suma son los puntos que acumula el jugador, manteniendo el turno. El juego finaliza cuando ya no quedan casillas vacías en el tablero, ganando el jugador con mayor puntuación.</p>
          <button onclick="cerrarDialogo(0);" class="boton">Cerrar</button>`;

  dialogo.innerHTML = html;
  document.body.appendChild(dialogo);
  dialogo.showModal();
}

function actualizarmarcador(){
  var tabla=document.getElementById("marcador");
  let partidaJSON=sessionStorage.getItem("partida");
  const partida = JSON.parse(partidaJSON);
  var clase1="",
      clase2="";
  if(partida.turno=="jugador1"){
      clase1="tuturno";
  }else{clase2="tuturno"}
     let html= `<tr class="${clase1}"><td id="jugador1" >${partida.jugador1}</td><td id="jugador2" >${partida.puntuacion1}</td>
     </tr><tr class="${clase2}"><td>${partida.jugador2}</td><td>${partida.puntuacion2}</td></tr> `;
     tabla.innerHTML += html;

}

//DIBUJAR TABLERO
function tablero(){
  let partidaJSON=sessionStorage.getItem("partida");
  const partida = JSON.parse(partidaJSON);
  let matriz= partida.tablero;
// Obtén el elemento canvas del DOM
const canvas = document.getElementById('tablero');
const ctx = canvas.getContext('2d');

// Configura el tamaño del canvas
canvas.width = 400; // Ancho del canvas en píxeles
canvas.height = 400; // Alto del canvas en píxeles

// Calcula el tamaño de cada celda en la cuadrícula
const cellSize = canvas.width / 4;

// Recorre la matriz y dibuja las celdas con los números correspondientes
    for (let fila = 0; fila < 4; fila++) {
        for (let columna = 0; columna < 4; columna++) {
            const numero = matriz[fila][columna];
            if(sessionStorage.getItem("seleccionada")){
                canvas.style.cursor='pointer';
            }else canvas.style.cursor='not-allowed';


            // Calcula la posición de la celda en el canvas
            const x = columna * cellSize;
            const y = fila * cellSize;

            // Dibuja la celda

            if (numero == -1) { // Casillas no jugables
                ctx.fillStyle = '#9c9c9c'; 
                ctx.fillRect(x, y, cellSize, cellSize);
                } else if(numero==0){ //Casilla jugable
                    ctx.fillStyle = '#FFFFFF'; 
                    ctx.fillRect(x, y, cellSize, cellSize);
                }else { //Casilla ya jugada
                    ctx.fillStyle = '#f7a9a8ff'; 
                    ctx.fillRect(x, y, cellSize, cellSize);
                    // Dibuja el número dentro de la celda
                    ctx.fillStyle = '#000000'; // Color del número
                    ctx.font = 'bold 24px Arial'; // Fuente y tamaño del número
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(numero.toString(), x + cellSize / 2, y + cellSize / 2);
                }
            // Dibuja las líneas divisorias
            ctx.strokeStyle = '#000000'; // Color de las líneas divisorias
            ctx.lineWidth = 2; // Ancho de las líneas divisorias
            ctx.strokeRect(x, y, cellSize, cellSize);
        }
    }
      comprobar();
}
function fichas(){
  let partidaJSON=sessionStorage.getItem("partida");
  const partida = JSON.parse(partidaJSON);
  var numeros= partida.numeros;
  let num1=document.getElementById("1");
  let num2=document.getElementById("2");
  let num3=document.getElementById("3");
  console.log(numeros[0]);
  if(numeros[0]!="0"){
      num1.innerText=numeros[0];
  }else{
       num1.classList.remove("sombreado");
       num1.classList.add("nojugable");
  }
  if(numeros[1]!="0"){
      num2.innerText=numeros[1];
  }else{
      num2.classList.remove("sombreado");
      num2.classList.add("nojugable");
 }
  if(numeros[2]!="0"){ 
      num3.innerText=numeros[2];
  }else{
      num3.classList.remove("sombreado");
      num3.classList.add("nojugable");
 }
}
function seleccionar(numero){
  let ficha= document.getElementById(numero);
 
  if(sessionStorage.getItem("seleccionada")){
      let des_ficha=document.getElementById(sessionStorage.getItem("seleccionada"));
      if(!(des_ficha.classList.contains("nojugable"))){
          des_ficha.classList.remove("seleccionado");
          des_ficha.classList.add("sombreado");
          console.log("Entroalomejor");
      }
  }
  if(!(ficha.classList.contains("nojugable"))){
      ficha.classList.remove("sombreado");
      ficha.classList.add("seleccionado");
      sessionStorage.setItem("seleccionada", numero);
  }
  tablero();
  
}
function usar(){
  const numero= sessionStorage.getItem("seleccionada");

  let ficha= document.getElementById(numero);
  ficha.innerText="";
  ficha.classList.remove("sombreado");
  ficha.classList.remove("seleccionado");
  ficha.classList.add("nojugable");

  let partidaJSON=sessionStorage.getItem("partida");
  const partida = JSON.parse(partidaJSON);
  var numeros= partida.numeros;

  numeros[numero-1]="0";
  partida.numeros=numeros;
  const partidaJSONact = JSON.stringify(partida);        
  sessionStorage.setItem("partida",partidaJSONact);
  sessionStorage.removeItem("seleccionada");

  tablero();
}


//Colocar fichas
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('tablero');
  if (canvas) {
    // Aquí colocas tu código JavaScript que interactúa con el canvas
    canvas.addEventListener('click', handleClick);
    function handleClick(event) {
      // Obtiene la posición del click relativa al canvas
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Calcula la posición de la celda en la que se hizo click

      const cellSize = canvas.width / 4;
      const columna = Math.floor(x / cellSize);
      const fila = Math.floor(y / cellSize);
      const seleccionada= sessionStorage.getItem("seleccionada");
      var ficha=document.getElementById(seleccionada);
      // Guarda el número en la posición correspondiente de la matriz

      let partidaJSON=sessionStorage.getItem("partida");
      const partida = JSON.parse(partidaJSON);
      
      var matriz=partida.tablero;
      
      if(matriz[fila][columna]==0 && matriz[fila][columna]!=-1){
      //se actualiza la matriz del tablero y se vuelve a guardar en el session Storage.
        const num= parseInt(ficha.textContent)
        matriz[fila][columna]=num;
        partida.tablero=matriz;
        const partidaJSONact = JSON.stringify(partida);        
        sessionStorage.setItem("partida",partidaJSONact);

        usar();
        // Vuelve a dibujar el tablero
        tablero();
      }
      }
  }

 
  canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    const { fila, columna } = getCasillaPos(mouseX, mouseY);
    let partidaJSON=sessionStorage.getItem("partida");
    const partida = JSON.parse(partidaJSON);
    
    var matriz=partida.tablero;
    //Establecer cursor según si se ha seleccionado ficha
    if(sessionStorage.getItem("seleccionada")){
        console.log((matriz[fila][columna] != 0));
    // Establece el estilo de cursor según la casilla actual
        if (matriz[fila][columna] == -1 || (matriz[fila][columna] != 0)) {
        canvas.style.cursor = 'not-allowed';
        console.log("distinto");
        } else {
        canvas.style.cursor = 'pointer';
        }
    }else canvas.style.cursor='not-allowed';
  });


  function getCasillaPos(x, y) {
   
    const cellSize = canvas.width / 4;
    const fila = Math.floor(y / cellSize);
    const columna = Math.floor(x / cellSize);
    return { fila, columna };
  }
});



//comprobar fin de partida
function comprobar(){
    let partidaJSON=sessionStorage.getItem("partida");
    const partida = JSON.parse(partidaJSON);
    var numeros= partida.numeros;
    var matriz= partida.tablero;
    var matrizJSON= JSON.stringify(matriz);
    console.log("matriz"+matriz);
    console.log("matrizJOSN"+matrizJSON);
    if(numeros[0]==0 && numeros[1]==0 && numeros[2]){
        //PETCIIÓ POST para comprobar juego
        var url = `./api/comprobar`;
        const peticion = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: matrizJSON
        };
        console.log(peticion);
        fetch(url, peticion)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function(datos){
                console.log("DATOS", datos);
              })
              .catch(function (error) {
                console.log("Error al analizar la respuesta como JSON:", error);
              });
            console.log("La petición funcionó correctamente");
          } else {
            console.log("Error en la petición:", response.status);
          }
        })
        .catch(function (error) {
          console.log("Error de red:", error);
        });
      
    }
}

