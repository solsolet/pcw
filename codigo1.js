function prepararArticulos(){
    let articulos =document.querySelectorAll('article');
    articulos.forEach(function(a){
        a.addEventListener('click', function(evt){
            evt.target.classList.toggle('seleccionado');
        });
    });
}
function mostrarValor(evt){
    console.log(evt.type + ':'+ evt.target.value);
}