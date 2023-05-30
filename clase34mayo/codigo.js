function prepararDnD(){
    //origen
    let lis=document.querySelectorAll(' #origen>ul>li');
    
    lis.forEach(function(li,idx){
        li.setAttribute('dragabble', 'true');
        li.setAttribute('data-id', idx);
        li.ondragstart=function(evt){
            let id=evt.target.getAttribute('data-id');
            evt.dataTransfer.setData('text/plain', id);
        }
    });

    //destino
    let destino= document.querySelectorAll(' #cv01');

    destino.ondragstart=function(evt){
        evt.preventDefault();
    }

    destino.ondrop=function(evt){
        evt.preventDefault();

        let id = evt.dataTransfer.getData('text/plain'),
            li = document.querySelector(`li[data-id="${id}"]`);
        
        document.querySelector('#destino>ul').appendChild(il);



    }
    
}