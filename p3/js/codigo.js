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

function cargar(){
    if(!sessionStorage.getItem('jugador1')){
        window.location.href='index.html';
    }
}

function volver(){
    if(sessionStorage.getItem('jugador1')){
        window.location.href="juego.html";
    }else window.location.href="index.html";
}
