function cargarFoto(btn){
   
    btn.parentElement.parentElement.querySelector('input[type="file]').click();

}
function eliminarFoto(btn){
   
    let div=btn.parentElement.parentElement;
    div.remove();
}
function mostrarFoto(inp){
    let fichero=inp.files[0],
     img=inp.parentElement.querySelector('img');
     img.src=URL.createObjectURL(fichero);
}
function anyadirFoto(){
    let ficha=document.querySelector('.foto').cloneNode(true);
    ficha.querySelector('input[type="file"]');
    document.querySelector('body>section>div').appendChild(ficha);
}