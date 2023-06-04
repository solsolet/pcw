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
  
                        
                       
                        //asignacion aleatoria de qué jugador empieza primero, si sale 0 comienza el jugador1 sino el jugador2. Se asigna el turno al primero.
                        var jug_primero;
                        const primero = Math.round(Math.random());
                      
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
  
                        siguiente_turno();
                        tablero();
                        fichas();
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
    let dialogo = document.createElement('dialog'),
    html = '';
    var juega="jugador";
    if(partida.turno=="jugador1"){
        juega=partida.jugador1;
    }else{
        juega=partida.jugador2;
    }
  
        html +=`<h3>Siguiente turno</h3>
            <p>Le toca a ${juega}</p>
            <button onclick="cerrarDialogo(0);" class="boton">Cerrar</button>`;
       
  
    dialogo.innerHTML = html;
    document.body.appendChild(dialogo);
    dialogo.showModal();
  }
  function cambiar_turno(){
    let partidaJSON=sessionStorage.getItem("partida");
    const partida = JSON.parse(partidaJSON);
    if(partida.turno=="jugador1"){
      partida.turno="jugador2";
    }else{ 
      partida.turno="jugador1";
    }
    const partidaJSONact = JSON.stringify(partida);        
    sessionStorage.setItem("partida",partidaJSONact);
    actualizarmarcador();
  
  
  }
  
  function cerrarDialogo(valor){
    document.querySelector('dialog').close(); //en açò NOMÉS no es borra del html
    document.querySelector('dialog').remove(); //en açò si
  }
  
  function fin_forzado(){
    sessionStorage.removeItem("jugador1");
    sessionStorage.removeItem("jugador2");
    sessionStorage.removeItem("partida");
    window.location.href="index.html";
  }
  
  
  
  function ayuda(){
    let dialogo = document.createElement('dialog'),
    html = '';
  
        html +=`<h3>Ayuda</h3>
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
       let html= `<tr>
       <th>Usuario</th>
       <th>Puntuación</th>
        </tr>
        <tr class="${clase1}"><td id="jugador1" >${partida.jugador1}</td><td id="jugador2" >${partida.puntuacion1}</td>
       </tr><tr class="${clase2}"><td>${partida.jugador2}</td><td>${partida.puntuacion2}</td></tr> `;
       tabla.innerHTML = html;
  
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
     
  }
  function fichas(){
    let partidaJSON=sessionStorage.getItem("partida");
    const partida = JSON.parse(partidaJSON);
    var numeros= partida.numeros;
    let num1=document.getElementById("1");
    let num2=document.getElementById("2");
    let num3=document.getElementById("3");
    if(numeros[0]!="0"){
        if(num1.classList.contains("nojugable")){
          num1.classList.remove("nojugable");
        }
        num1.classList.add("sombreado");
        
        num1.innerText=numeros[0];
    }else{
         num1.classList.remove("sombreado");
         num1.classList.add("nojugable");
    }
    if(numeros[1]!="0"){
        num2.innerText=numeros[1];
        num2.classList.add("sombreado");
        num2.classList.remove("nojugable");
    }else{
        num2.classList.remove("sombreado");
        num2.classList.add("nojugable");
   }
    if(numeros[2]!="0"){ 
        num3.innerText=numeros[2];
        num3.classList.add("sombreado");
        num3.classList.remove("nojugable");
    }else{
        num3.classList.remove("sombreado");
        num3.classList.add("nojugable");
   }
  }
  
  function seleccionar(numero){
    let ficha= document.getElementById(numero);
    if(!(ficha.classList.contains("nojugable"))){
    if(sessionStorage.getItem("seleccionada")){
        let des_ficha=document.getElementById(sessionStorage.getItem("seleccionada"));
        if(!(des_ficha.classList.contains("nojugable"))){
            des_ficha.classList.remove("seleccionado");
            des_ficha.classList.add("sombreado");
         
        }
    }
  
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
    comprobar();
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
      // Establece el estilo de cursor según la casilla actual
          if (matriz[fila][columna] == -1 || (matriz[fila][columna] != 0)) {
          canvas.style.cursor = 'not-allowed';
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
  
  
  
  //comprobar si hay múltiplo de cinco
  function comprobar(){
      let partidaJSON=sessionStorage.getItem("partida");
      const partida = JSON.parse(partidaJSON);
      var numeros= partida.numeros;
      var matriz= partida.tablero;
  
      var matrizJSON= JSON.stringify(matriz);
     // if(numeros[0]==0 && numeros[1]==0 && numeros[2]){
          //PETCIIÓ POST para comprobar juego
          
          //PETICION CON FETCH
          let fd = new FormData();
  
          fd.append('tablero', matrizJSON);
          console.log(matrizJSON);
          var url = `./api/comprobar`;
          const peticion = {
              method: 'POST',
              body: fd
          };
          fetch(url, peticion)
          .then(function (response) {
            if (response.ok) {
              response.json().then(function(datos){
               
                  console.log("DATOS", datos);
                  console.log((datos.CELDAS_SUMA).length)
                  if((datos.CELDAS_SUMA).length==0){
                    //comprobar fin
                    if(datos.JUGABLES!=0){
                      cambiar_turno();
                      console.log("generar numero1");
                      generar_numeros();
                    }else{
                      let dialogo = document.createElement('dialog'),
                      html = '';
                      var ganador;
                      var puntos;
                    
                      if(partida.puntuacion1>partida.puntuacion2){
                          ganador=partida.jugador1;
                          puntos=partida.puntuacion1;
                      }else{
                        ganador=partida.jugador2;
                        puntos=partida.puntuacion2;
                      }
                    
                          html +=`<h3>FIN DE PARTIDA</h3>
                              <p>Ganador ${ganador} con ${puntos} puntos</p>
                              <button onclick="fin();" class="boton">Cerrar</button>`;
                         
                    
                      dialogo.innerHTML = html;
                      document.body.appendChild(dialogo);
                      dialogo.showModal();
                    
                    }
                  }else{
                      var score=0;
                      for(var i=0; i<datos.CELDAS_SUMA.length;i++){
                          var casillaJSON=datos.CELDAS_SUMA[i];
                          const casilla = JSON.parse(casillaJSON);
                          var fila=parseInt(casilla.fila);
                          var columna= parseInt(casilla.col);
                        
                          
                          score+=matriz[fila][columna];
                          matriz[fila][columna]=0;
                      }
                      console.log("generar num 2");
                      generar_numeros();
                      partida.tablero=matriz;
                      if(partida.turno=="jugador1"){
                        partida.puntuacion1+=score;
                      }else partida.puntuacion2+=score;
  
                      const partidaJSON = JSON.stringify(partida);        
                      sessionStorage.setItem("partida",partidaJSON);
                      tablero();
                      actualizarmarcador(); 
                  }
                  
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
        
  
  
  
          
        //PETICION CON AJAX
         /* var url = './api/comprobar';
              var peticion = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: matrizJSON
              };
  
              console.log(peticion);
  
              var xhr = new XMLHttpRequest();
              xhr.open(peticion.method, url);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.onload = function () {
                if (xhr.status === 200) {
                  var datos = JSON.parse(xhr.responseText);
                  console.log('DATOS', datos);
                  console.log('La petición funcionó correctamente');
                } else {
                  console.log('Error en la petición:', xhr.status);
                }
              };
              xhr.onerror = function () {
                console.log('Error de red:', xhr.status);
              };
              xhr.send(JSON.stringify(peticion.body));*/
     // }
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
        if(puntuacionesJSONs.length<10){ 
          puntuacionesJSONs.push(nuevo1);
          puntuacionesJSONs.push(nuevo2);
        }else{
          puntuacionesJSONs.push(nuevo1);
          puntuacionesJSONs.push(nuevo2);
         // Ordenar el array por puntuación de forma descendente
         puntuacionesJSONs.sort(function(a, b) {
          return b.puntuacion - a.puntuacion;
          });
        //borramos los dos últimos que serán los menores
          puntuacionesJSONs.pop();
          puntuacionesJSONs.pop();
        /*var ultimoElemento = puntuacionesJSONs[puntuacionesJSONs.length -1];
        if(ultimoElemento.puntuacion < partida.puntuacion1){
          if(ultimoElemento.puntuacion > partida.puntuacion2){
            puntuacionesJSONs.pop();
            puntuacionesJSONs.push(nuevo1);
          }else{
  
          }
  
          }}*/
         
        
      }
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
  
  function generar_numeros(){
    
    let partidaJSON=sessionStorage.getItem("partida");
    const partida = JSON.parse(partidaJSON);
  
    var num=partida.numeros;
    console.log("numeros"+num);
    if(num[0]==0 && num[1]==0 && num[2]==0){
        let numero, numeros = [];
                            
      //Genera los 3 nº aleatorios para empezar (- el 5)
      for(let i=0; i<3; i++){
          do 
              numero = Math.floor(Math.random()*9) + 1;
          while(numero == 5);
          numeros[i] = numero;
      }
  
      partida.numeros=numeros;
      console.log("partida"+partida.numeros);
  
      const partidaJSONnueva = JSON.stringify(partida);        
      sessionStorage.setItem("partida",partidaJSONnueva);
  
      fichas();
  }
  
  }