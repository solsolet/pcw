/* ------------ CODI GENERAL ------------ */
window.onload = navBar;
// Comprovar usuari loguejat (localStorage i sessionStorage)
function usuarioLogueado(){
    var logueado = false;
    if(localStorage.getItem("login") || sessionStorage.getItem("login"))
        logueado = true;
    
    return logueado;
}

// Neteja storage del navegador
function clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
}

// Mostra Barra Nav
function navBar(){
    let logueado = usuarioLogueado(),
        enlaces = '';
    //const nav = document.getElementsByClassName("menu"); no agafa la classe no sé per qué
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
    let logueado = usuarioLogueado();
    const nav = document.getElementById("menu");

    if(logueado){ //Alta un nuevo lugar y logout
        //inserta abans del final del element nav
        nav.insertAdjacentHTML("beforeend",`<li><a href="nueva.html"><i class="fa-solid fa-newspaper"></i> Nueva</a></li>
                                            <li><a href="index.html"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>`);
    }
    else if(!logueado){ //Inicio, Login, Buscar y Registrarse
        nav.insertAdjacentHTML("beforeend",`<li><a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a></li>
                                            <li><a href="registro.html"><i class="fa-solid fa-user-plus"></i> Registro</a></li>`);
    }
    else console.log("Error inesperado detectando si el usuario está logueado.");
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
                    console.log(data.FILAS.lenght);

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
                                // fotoAutor: "usuario5.jpg"
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