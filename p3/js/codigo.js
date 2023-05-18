function inicio(){
        var tabla=document.getElementById("tabla_ultimos");
        var seccion_tabla=document.getElementById("tabla_mensaje");
    if(sessionStorage.getItem("jugador1")){
        window.location.href="juego.html";
    }else{
        if(sessionStorage.getItem("puntuaciones")){
            //hacer cálculos para insertar cosas en tabla
        }else{
            var text="Todavía no hay puntuaciones guardadas. Sé el primero en conseguir una puntuación máxima";
            var textNode = document.createTextNode(text);
            seccion_tabla.appendChild(textNode);
            
        }
    }
    if(sessionStorage.getItem('jugador1')){
        window.location.href='juego.html';
    }
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