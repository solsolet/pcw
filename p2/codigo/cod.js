/* ------------ CODI GENERAL ------------ */
document.addEventListener("DOMContentLoaded", navBar); //carrega quan HTML està llest

(function(){ //redirigir autoejecutada
    let logueado = usuarioLogueado();

    console.log(logueado);

    if (logueado && (window.location.href.split('/').pop() === 'login.html' || window.location.href.split('/').pop() === 'registro.html')) { /* Si estas logueado y no puedes entrar */
        window.location.href = 'index.html';
    }
    else if (!logueado && (window.location.href.split('/').pop() === 'nueva.html' || window.location.href.split('/').pop() === 'publicacion.html')) { /* Si estas logueado y no puedes entrar */
        window.location.href = 'index.html';
        console.log("entra");
    }
})();

// Comprovar usuari loguejat (localStorage i sessionStorage)
function usuarioLogueado(){
    var logueado = false;
    if(localStorage.getItem("_datos_") || sessionStorage.getItem("_datos_"))
        logueado = true;
    
    return logueado;
}

// Neteja storage del navegador
function clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
}

// Mostra Barra Nav
function navBar(){ //fa cas al de baix
    let logueado = usuarioLogueado(),
        enlaces = '';
    
    const nav = document.getElementById("menu");

    if(logueado){ //Alta un nuevo lugar y logout
        enlaces = `<li><a href="nueva.html"><i class="fa-solid fa-newspaper"></i> Nueva</a></li>
                   <li><a href="index.html"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>`;
    }
    else if(!logueado){ //Inicio, Login, Buscar y Registrarse
        enlaces = `<li><a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a></li>
                   <li><a href="registro.html"><i class="fa-solid fa-user-plus"></i> Registro</a></li>`;
        nav.innerHTML += enlaces;
    }
    else console.log("Error inesperado detectando si el usuario está logueado.");
}

/* altra manera de ferho, fer dos menu i fer display none a la que no volem que isca */
/* altra manera, amb lo de createelement i appendChild (complicat) */

/* altra manera amb insertAdjacentHTML (+segur)*/
function navBar(){
    let logueado = usuarioLogueado(),
        nav = document.getElementsByClassName('menu')[0]; //els className es un array
    
    if(logueado){ //Alta nuevo lugar y logout
        //inserta abans del final del element nav
        nav.insertAdjacentHTML("beforeend",`<li><a href="nueva.html"><i class="fa-solid fa-newspaper"></i> Nueva</a></li>
                                            <li><a href="index.html"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>`);
    }
    else if(!logueado){ //Inicio, Login, Buscar y Registrarse
        nav.insertAdjacentHTML("beforeend",`<li><a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a></li>
                                            <li><a href="registro.html"><i class="fa-solid fa-user-plus"></i> Registro</a></li>`);
    }
    else console.log("Error inesperado detectando si el usuario está logueado.");

    classAct();
}

function classAct(){ //afegir class="act" al <li> de navBar que corresponga
    let pag_activa = window.location.href.split('/').pop(), //ens quedem en el nsq.html de la URL
        links = document.querySelectorAll('.menu li a');
    
    try{
        links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === pag_activa) {
                link.parentNode.classList.add('act');
                throw new Error('ja hi ha 1 element amb act')
            }
        });
    } catch{ 
        //res, només per a ixir del forEach
    }
}

/* ----------------- PETICIONS -----------------  */
let pag = 0; //per a la paginació
//Index petició GET api/publicaciones
function getPublicaciones(pag) {
    var url = `./api/publicaciones?pag=${pag}&lpag=6`, //tindre en compte que només hi ha 4 publicacions a la bd 
        publicaciones = document.getElementById("publicaciones");

    // fetch usa el método GET por defecto
    fetch(url)
        .then(function(res){ //res de response
            if(res.ok){ // if(response.status==200)
                res.json().then(function(data) { // se tiene la respuesta y con 
                    console.log(data);          // json() se recoge en data como objeto javascript

                    let html = '';
                
                    data.FILAS.forEach(e => {
                        console.log(e);
                        html += `<article class="carta">
                                    <a href="publicacion.html?id=${e.id}"><h4 title="${e.titulo}" class="recorte">${e.titulo}</h4></a>
                                    <a href="publicacion.html?id=${e.id}"><img src="./fotos/pubs/${e.imagen}" alt="${e.nombreZona}"></a>
                                    <div>
                                        <img src="./fotos/usuarios/${e.fotoAutor}" alt="Imagen del ${e.fotoAutor}" class="autorXicotet">
                                        <p>${e.autor}<br><i class="fa-regular fa-calendar"></i> <time datetime="${e.fechaCreacion}">${e.fechaCreacion}</time></p>
                                    </div>
                                </article>`;
                    });
                    publicaciones.insertAdjacentHTML("beforeend", html);

                    // PAGINACIÓN
                    document.querySelector('#pag').textContent = parseInt(data.PAG) + (data.FILAS.length > 0?1:0);
                    document.querySelector('#totalPags').textContent = Math.ceil(parseInt(data.TOTAL_COINCIDENCIAS) / parseInt(data.LPAG));
                    
                    //paginacion(pag);
                });
            }
            else{
                console.log('Error(' + res.status + '): ' + res.statusText);
                return;
            }
        }).catch(function(err) {
        console.log('Fetch Error: ' + err);
    });
}

//implementar funcionament quant insertem
function paginacion(pag){
    let p = document.getElementById("bPrimera"),
        a = document.getElementById("bAnterior"),
        s = document.getElementById("bSiguiente"),
        u = document.getElementById("bUltima"),
        pag_actual = document.getElementById("pag");

    p.addEventListener("click", () => {
        if (pag > 0) {
          pag = 0;
        }
        pag_actual.innerHTML = pag;
    });
    a.addEventListener("click", () => {
        if (pag > 0) { pag--; }
        pag_actual.innerHTML = pag;
    });
    s.addEventListener("click", () => {
        if (pag < 6) { pag++; }
        pag_actual.innerHTML = pag;
    });
    u.addEventListener("click", () => {
        if (pag < 6) { pag = 6; }
        pag_actual.innerHTML = pag;
    });
    pag_actual.innerHTML = pag;
}

/* ------------- CODI LOGIN.HTML ------------- */
/* Login POST api/usuarios/login AJAX */
function postLogin(evt){
    evt.preventDefault(); //cancela la accion por defecto del evento

    let frm = evt.currentTarget,
        xhr = new XMLHttpRequest(),
        url = 'api/usuarios/login',
        fd = new FormData(frm);

    xhr.open('POST', url, true);
    xhr.responseType = 'json';

    xhr.onload = function(){
        let r = xhr.response; //"r" es com el "data"
        console.log(r);

        if(r.RESULTADO == 'OK'){ //es lo que posa el json de resposta
            let dialogo = document.createElement('dialog'),
                html = '';

            html += `<h3>Bienvenido ${r.NOMBRE}</h3>`;
            html = '<button onclick:"cerrarDialogo(0);">Cerrar</button>'

            dialogo.innerHtml = html;
            document.body.appendChild(dialogo);
            dialogo.showModal();
            sessionStorage['_datos_'] = JSON.stringify(r);

            console.log( JSON.parse(sessionStorage['_datos_']) );
            console.log( _datos_.LOGIN);
        }
        else{
            console.log('error');
        }
    }
    xhr.send(fd); //enviem la informació fd
}

function cerrarDialogo(valor){
    console.log(valor);
    document.querySelector('dialog').close(); //en açò NOMÉS no es borra del html
    document.querySelector('dialog').remove(); //en açò si
}