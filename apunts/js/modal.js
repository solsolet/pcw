  
function modal(){
    let dialogo = document.createElement('dialog'),
        html = '',
        juega = "jugador";
        html += `<h3>Título Modal</h3>
            <p>Le toca a ${juega}</p>
            <button onclick="cerrarDialogo(0);" class="boton">Cerrar</button>`;
        

    dialogo.innerHTML = html;
    document.body.appendChild(dialogo);
    dialogo.showModal();
}

function cerrarDialogo(valor){
    document.querySelector('dialog').close(); //en açò NOMÉS no es borra del html
    document.querySelector('dialog').remove(); //en açò si
}