function prepararDnD(){
    //origen
    let imgs=document.querySelectorAll('section>footer>img');
    
    imgs.forEach(function(img,idx){
        img.setAttribute('dragabble', 'true');
        img.setAttribute('data-id', idx);
        img.ondragstart=function(evt){
            let id=evt.target.getAttribute('data-id');
            evt.dataTransfer.setData('text/plain',id);
        }
    });

    //destino
    let cv= document.querySelectorAll(' #destino');

    cv.ondragover=function(evt){
        evt.preventDefault();
    }

    cv.ondrop=function(evt){
        evt.preventDefault();

        let id = evt.dataTransfer.getData('text/plain'),
            li = document.querySelector(`img[data-id="${id}"]`);
        
        ctx=cv.getCoontext('2d');

        ctx.drawImage(img,0,0,cv.width, img.height*(cv.width/img.width));

    



    }
    
}