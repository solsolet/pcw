const ANCHO = 480,
      ALTO = 360;

function prepararCanvas(){
    /* let cv = document.querySelector("#cv01"); //para solo 1 canvas

    cv.width = ANCHO;
    cv.height = ALTO;

    ponerEventos(); */

    let cvs = document.querySelectorAll('canvas'); //para todos los canvas

    cvs.forEach(function(cv){
        cv.width = ANCHO;
        cv.height = ALTO;
    });
}

function ponerEventos(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d');

    //cv.addEventListener('mousemove', function(evt){ //canviar per a 'click'
    cv.addEventListener('click', function(evt){ 
        let x = evt.offsetX,
            y = evt.offsetY,
            altoCelda = ALTO/4,
            anchoCelda = ANCHO/4,
            fila, col;
        //console.log(`(x,y): (${x}, ${y})`);
        
        fila = Math.floor(y/altoCelda);
        col = Math.floor(x/anchoCelda);
        console.log(`(fila,col): (${fila}, ${col})`);
    });
}

function ejemplo01(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = "#a11";
    ctx.lineWidth = 2;

    ctx.moveTo(100, 100);
    ctx.lineTo(200, 150);
    ctx.lineTo(80, 200);

    ctx.stroke();

    ctx.beginPath(); //cambio de operacion de dibujo
    ctx.moveTo(200, 300);
    ctx.lineTo(150, 200);

    ctx.stroke(); //pinta todo lo haya en el buffer
}

function ejemplo02(){ /* dibuja rectangulo */
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = "#00f";
    ctx.lineWidth = 20;

    ctx.strokeRect(100,100, 200, 150);
    ctx.fillStyle = "#0ff";
    ctx.fillRect(100,100, 200, 150);
}

function ejemplo03(){ /* dibuja circulo */
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');
        
    ctx.beginPath();
    ctx.strokeStyle = "#30f";
    ctx.lineWidth = 2;

    ctx.arc(200, 200, 100, 0, 3*Math.PI/2, false);
    ctx.moveTo(220, 200); //200+20 en el primero
    ctx.arc(200, 200, 20, 0, 2*Math.PI);
    
    ctx.stroke();
}

function ejemplo04(){
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

    ctx.beginPath();
    //ctx.globalAlpha = .5;
    ctx.fillStyle = "#0ffa";

    ctx.fillRect(200,200, 100, 150);
}

function ejemplo05(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d'),
        texto = 'Hola p Mundo!!';

    ctx.fillStyle = "#95c2c2";
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'middle';
    ctx.font = 'italic 32px Lato';
    ctx.fillText(texto, 100, 100);

    ctx.beginPath();
    ctx.strokeStyle = '000';
    ctx.lineWidth = 2;

    ctx.moveTo(100, 0);
    ctx.lineTo(100, cv.height);
    ctx.moveTo(0, 100);
    ctx.lineTo(cv.width, 100);

    ctx.stroke();
}

function divisiones(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d'),
        celdas = 4,
        anchoCelda = ANCHO/celdas,
        altoCelda = ALTO/celdas;

    ctx.beginPath();
    ctx.strokeStyle = '#123';
    ctx.lineWidth = 2;

    for(let i=1; i<celdas; i++){
        // Verticales
        ctx.moveTo(i * anchoCelda, 0);
        ctx.lineTo(i * anchoCelda, cv.height);
        // Horizontales
        ctx.moveTo(0, i * altoCelda);
        ctx.lineTo(cv.width, i * altoCelda);
    }
    ctx.stroke();
}

// classe del 10 de maig
function ejemplo06(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d');

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#a00';

    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(100, 300);

    //ctx.closePath(); //tanca la figura
    ctx.fillStyle = '#a12';
    ctx.fill();
    ctx.stroke();
}

function limpiar(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d');

    //ctx.clearRect(0, 0, cv.width, cv.height);
    cv.width = cv.width; //es lo mateix i borra
    //cv.height = cv.height;
}

function escalar(){
    let cv = document.querySelector("#cv01");
        ctx = cv.getContext('2d');

    ctx.scale(1.25, 1.25); //va entre 0-1
}
function imagen01(){
    let cv = document.querySelector("#cv01"),
        ctx = cv.getContext('2d'),
        imagen = document.querySelector('img'),
        x, y,
        anchoImagen = cv.width * .8,
        altoImagen;

    altoImagen = imagen.height * (anchoImagen/imagen.width);
    //ctx.drawImage(imagen, 0, 0, cv.width, cv.height);
    x = (cv.width - anchoImagen)/2;
    y = (cv.height - altoImagen)/2;

    //ctx.drawImage(imagen, x, y, anchoImagen, altoImagen);
    ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height, 100,100,200,150); //trocea la imagen
}

function cargarImagen(inp){
    let file = inp.files[0];

    if(file){
        let cv = document.querySelector("#cv01"),
            ctx = cv.getContext('2d'),
            img = new Image();

        /* img.src = URL.createObjectURL(file); //asíncrono, alomejor tarda si pesa mucho
        ctx.drawImage(img, 0, 0, cv.width, img.height*(cv.width/img.width)); */
        img.onload = function(){
            ctx.drawImage(img, 0, 0, cv.width, img.height*(cv.width/img.width));
        }
        img.src = URL.createObjectURL(file);
    }
}

function selImagen(){
    let inp = document.createElement('input');

    inp.type = 'file';
    inp.onchange = function(evt){
        cargarImagen(evt.target);
    }
    inp.click();
}

function copiar(){
    let cv1 = document.querySelector("#cv01"),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.querySelector("#cv02"),
        ctx2 = cv2.getContext('2d');

    ctx2.drawImage(cv1, 0, 0);
}

function copiarID(){ //copia igual que l'altre pero es pot manipular els bits
    let cv1 = document.querySelector("#cv01"),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.querySelector("#cv02"),
        ctx2 = cv2.getContext('2d'),
        imgData;
        
    imgData = ctx1.getImageData(0, 0, cv1.width, cv1.height);
    ctx2.putImageData(imgData, 0, 0);
}

function aColor(color){
    let cv1 = document.querySelector("#cv01"),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.querySelector("#cv02"),
        ctx2 = cv2.getContext('2d'),
        imgData, pixel;
        
    imgData = ctx1.getImageData(0, 0, cv1.width, cv1.height);

    for(let i=0; i<imgData.height; i++){
        for(let j=0; j<imgData.width; j++){
            pixel = (i*imgData.width + j)*4;

            switch(color){
                case 'r':
                    imgData.data[pixel+1] = 0; //green
                    imgData.data[pixel+2] = 0; //blue
                    break;
            
                case 'g':
                    imgData.data[pixel  ] = 0; //red //es comenta la que volem que es pose de color
                    imgData.data[pixel+2] = 0; //blue
                    break;
            
                case 'b':
                    imgData.data[pixel  ] = 0; //red //es comenta la que volem que es pose de color
                    imgData.data[pixel+1] = 0; //green
                    break;
            }
            /* imgData.data[pixel  ] = 0; //red //es comenta la que volem que es pose de color
            imgData.data[pixel+1] = 0; //green
            imgData.data[pixel+2] = 0; //blue
            //imgData.data[pixel+3] = 0; //alpha  */          
        }
    }
    ctx2.putImageData(imgData, 0, 0);
}

function guardar(){
    let cv1 = document.querySelector("#cv01"),
        a = document.createElement('a');

    a.href = cv1.toDataURL('image/jpeg'); //es posa en el formato que la vols
    a.download = 'download'; //el nom de la descarrega
    a.click();
}