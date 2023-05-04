const ANCHO = 480;
const ALTO = 360;
function prepararCanvas(){
    let cv = document.querySelector('#cv01');

    cv.width = ANCHO;
    cv.height = ALTO;

}
function ejemplo01(){
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');
    ctx.strokeStyle = "#a11";
    ctx.lineWidth = 2;
    ctx.moveTo(100,100);
    ctx.lineTo(200,150);
    ctx.lineTo(80,200);
    

    ctx.moveTo(200,300);
    ctx.lineTo(50,280);

    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle='#000';
    ctx.rect(20,20,100,50);


    ctx.stroke();
}
function ejemplo02(){
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');
    ctx.strokeStyle = '#a11';
    ctx.lineWidth = 20;
   ctx.strokeRect(100,100,200,150); //esquina superior izq(x,y), ancho y alto
   ctx.shadowColor='a11';

   ctx.fillStyle=('#a5d')
   ctx.fillRect(100,100,200,150);
}
function ejemplo03(){
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.strokeStyle='#a11';
        ctx.lineWidth=2;
        ctx.arc(200,200,100,0,3*Math.PI/2); //si no se le indica nada en el último parámetro va en sentido  de las agujas del relog

        //centro del circulo
        ctx.moveTo(220,200);
        ctx.arc(200,200,20,0,2*Math.PI);
        ctx.stroke();
}

function ejemplo04(){
    let cv = document.querySelector('#cv01'),
    ctx = cv.getContext('2d');
    //ctx.globalAlpha = .5;
    ctx.fillStyle = '#aaab';
    ctx.fillRect(200,200,100,80);
}

function dibujarTexto(){
    let cv = 
    document.querySelector('#cv01'),
        ctx = cv.getContext('2d'),
        texto = 'Hola Mundo!!';

        ctx.fillStyle = '#000';
        ctx.font='italic 32px Arial';
        ctx.fillText(texto, 100,100);

}