/* D&D de llistes */
function prepararDnD1(){
    //origen
    let lis = document.querySelectorAll('#origen>ul>li');

    lis.forEach(function(li, idx){
        li.setAttribute('draggable', 'true'); //fa arrastrable
        li.setAttribute('data-id', idx); //index de la llista original

        li.ondragstart = function(evt){
            let id = evt.target.getAttribute('data-id'); //per a evitar problemes
            evt.dataTransfer.setData('text/plain', id) //passem text pla (tmb es pot uri, nsq...)
        }
    });

    //denstino
    let destino = document.querySelector('#destino');

    destino.ondragover = function(evt){
        evt.preventDefault();
    }
    destino.ondrop = function(evt){
        evt.preventDefault();

        let id = evt. dataTransfer.getData('text/plain'),
            li = document.querySelector(`li[data-id="${id}"]`); //el [] per als atributs del li

        document.querySelector('#destino>ul').appendChild(li);

    }
}

/* D&D de imatges */
function prepararDnD2(){
    //origen
    let imgs = document.querySelectorAll('section>footer>img');

    imgs.forEach(function(img, idx){
        img.setAttribute('draggable', 'true');
        img.setAttribute('data-id', idx);

        img.ondragstart = function(evt){
            let id = evt.target.getAttribute('data-id');
            evt.dataTransfer.setData('text/plain', id);
        }
    });

    //destino
    let cv = document.querySelector('#cv03');

    cv.ondragover = function(evt){
        evt.preventDefault();
    }
    cv.ondrop = function(evt){
        evt.preventDefault();

        let file = evt.dataTransfer.files[0]; //coge el 1º y lo pinta

        if(file) {
            let img = new Image();

            img.onload = function (){
                let ctx = cv.getContext('2d');
                cv.width = cv.width;
                ctx.drawImage(img, 0, 0, cv.clientWidth, img.height*(cv.width/img.width));
            }
            img.src = URL.createObjectURL(file);
        }
        else {
            let id = evt.dataTransfer.getData('text/plain'),
                img = document.querySelector(`img[data-id="${id}"]`),
                ctx = cv.getContext('2d');
    
            cv.width = cv.width; //netejar el canvas
            ctx.drawImage(img, 0, 0, cv.clientWidth, img.height*(cv.width/img.width));
        }
    }
}