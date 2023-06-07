/* const ANCHO = 480,
      ALTO = 360; */ //ja apareix en canvas.js

function prepararSVG(){
    let svg = document.querySelector("#svg01"); //para solo 1 canvas
    /* let svgs = document.querySelectorAll('svg'); */ //para todos los SVG

    svg.setAttribute('width', ANCHO); //diferent que en canvas
    svg.setAttribute('height', ALTO);
/* 
    ponerEventos();
    cvs.forEach(function(cv){
        cv.width = ANCHO;
        cv.height = ALTO;
    }); */
}

function anyadir(){
    let html,
        cx, cy
        radio = 25;

    cx = radio + Math.ceil(Math.random() * (ANCHO - 2*radio)); /* ceil: coge entero superior */
    cy = radio + Math.ceil(Math.random() * (ALTO - 2*radio)); /* floor: coge entero inferior */

    html=`<circle
            cx="${cx}" cy"${cy}" r="${radio}"
            stroke="#00a"
            stroke-width="6px"
            fill="#a00"

            onclick="seleccionar(event);"
            onmousedown="clickDown(event);"
            onmousemove="mover(event);";
            onmouseup="clickUp(event);"
            onmouseleave="mouseLeave(event);"

        />`;

    document.querySelector("#svg01").innerHTML += html;
}

function seleccionar(evt){
    let circle = evt.target,
        sel = document.querySelector('.seleccionada');

    if(sel){
        sel.classList.remove('seleccionada'); //només selecciona 1
    }

    circle.classList.add('seleccionada');
    //circle.classList.toggle('seleccionada'); /* si te la classe la lleva, si no la posa */
}

function clickDown(evt){
    let circle = evt.target,
        x = evt.offsetX,
        y = evt.offsetY,
        pos;

    pos = {'x':x, 'y':y}; //elemento JS

    circle.setAttribute('data-pos', JSON.stringify(pos));

    console.log("DOWN");
    console.log(circle);
}

function clickUp(evt){
    let circle = evt.target;

    if(circle.getAttribute('data-pos')){
        circle.remove('data-pos');
    }
    console.log("UP");
    console.log(circle);
}

function mover(evt){ //NO FUNCIONA BÉ, CORREGIR
    let circle = evt.target,
        x = evt.offsetX,
        y = evt.offsetY;

    if(circle.getAttribute('data-pos')){
        let pos = JSON.parse(circle.getAttribute('data-pos')),
            dx = parseInt(x - pos.x), /* diferencia en x */
            dy = parseInt(y - pos.y), /* diferencia en x */
            cx, cy;

            cx = parseInt(circle.getAttribute('cx')) + parseInt(dx);
            cy = parseInt(circle.getAttribute('cy')) + parseInt(dy);

            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);

            pos = {'x':x, 'y':y};
            circle.setAttribute('data-pos', JSON.stringify(pos));
    }

    console.log(circle);
}

function mouseLeave(evt){
    clickUp(evt);
}