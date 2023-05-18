function inicio(){
        var tabla=document.getElementById("tabla_ultimos");
    if(sessionStorage.getItem("estado_actual")){
        window.location.href="juego.html";
    }else{
        if(sessionStorage.getItem("puntuaciones")){
            //hacer cálculos para insertar cosas en tabla
        }else{
           // var html="<p>Todavía no hay puntuaciones guardadas. Sé el primero en conseguir una puntuación máxima</p>";
            //tabla.appendChild(html);
        }
    }
}
function start(){
    let jugador1=document.getElementById("player1").value;
    let jugador2=document.getElementById("player2").value;
    console.log(jugador1 + jugador2)
    sessionStorage.setItem('jugador1', jugador1);
    sessionStorage.setItem('jugador2', jugador2);
    window.location.href='juego.html';
  
    
}
