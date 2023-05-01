/* ------------ CODI GENERAL ------------ */
(redirigir)(); //autoexecutada
document.addEventListener("DOMContentLoaded", function(){
    navBar();
}); //carrega quan HTML està llest

function redirigir(){
    let logueado = usuarioLogueado(),
        pagina = window.location.href.split('/').pop();

    if ((logueado && (pagina === 'login.html' || pagina === 'registro.html')) // Si estas logueado y no puedes entrar
        ||
       (!logueado && (pagina === 'nueva.html' || pagina === 'publicacion.html'))) {
        window.location.href = 'index.html';
    }
};

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
        let usu =  JSON.parse(sessionStorage.getItem('_datos_')).LOGIN;
        //inserta abans del final del element nav
        nav.insertAdjacentHTML("beforeend",`<li><a href="nueva.html"><i class="fa-solid fa-newspaper"></i> Nueva</a></li>
                                            <li><a href="index.html" onclick="hacerLogout();"><i class="fa-solid fa-right-from-bracket"></i> Logout ${usu}</a></li>`);
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

function getParametrosURL(){
    let queryString = window.location.search,
        urlParams = new URLSearchParams(queryString),
        param,
        id = urlParams.get('id');

    if(id != null){ //per a publicacion
        param = id;
    } else if(id == null){ //per a buscar
        let zona = urlParams.get('z');

        if(zona != null){ 
            const frm = document.getElementById("frm_busqueda");
            frm.elements["ubi"].value = zona;
            buscar(frm);
            param = frm;
        }
    }

    return param;
}

/* ------------- CODI PUBLICACION.HTML ------------- */
function getPublicacion(){
    let id_publicacion = getParametrosURL();
    var url = `./api/publicaciones/${id_publicacion}`,
        publicacion = document.getElementById("publicacion"), //on posar la info de la publicació
        logueado = usuarioLogueado(),
        usu, auth, header;

    if(logueado){
        usu = JSON.parse( sessionStorage['_datos_'] );
        auth = usu.LOGIN + ':' + usu.TOKEN;
        header = {'Authorization':auth}; //cabecera
    }

    // fetch usa el método GET por defecto
    fetch(url, { headers:header } )
        .then(function(res){
            if(res.ok){
                res.json().then(function(data) {
                    console.log(data);
                    let html = '';

                    data.FILAS.forEach(e => {
                        console.log(e);
                        html +=`<h3>${e.titulo}</h3>
                                <p>${e.texto}</p>
                                <a href="buscar.html?z=${e.nombreZona}"><i class="fa-solid fa-location-dot"></i> ${e.nombreZona}</a>
                                <div class="cajita">
                                    <img src="fotos/usuarios/${e.fotoAutor}" alt="Foto ${e.autor}">
                                    <p>${e.autor}</p>
                                    <p><i class="fa-regular fa-calendar"></i> <time datetime="${e.fechaCreacion}">${e.fechaCreacion}</time></p>
                                </div>
                                <a href="#comentarios"><span id="nComentarios"></span> Comentarios</a> <!--baixa a comentarios-->
                                <button id="mg" class="boton ok mg" onclick="postMG(${id_publicacion}, 'mg', ${e.meGusta});"><i class="fa-solid fa-thumbs-up"></i> Me gusta ${e.nMeGusta}</button>
                                <button id="nmg" class="boton ko mg" onclick="postMG(${id_publicacion}, 'nmg', ${e.meGusta});"><i class="fa-solid fa-thumbs-down"></i> No me gusta ${e.nNoMeGusta}</button>`;
                    });
                    publicacion.insertAdjacentHTML("beforeend", html);

                    //Botons MG
                    if(!logueado){ // Disable botons amb class="mg"
                        var botons = document.getElementsByClassName("mg");
                        for (var i = 0; i < botons.length; i++) {
                            botons[i].disabled = true;
                        }
                    }
                    getPublicacionFotos(id_publicacion);
                    getComentarios(id_publicacion);
                });
            }
        }).catch(function(err) {
        console.log('Fetch Error: ' + err);
    });
}

function postMG(id_p, tipo, data){
    let url = `api/publicaciones/${id_p}/`,
        usu = JSON.parse( sessionStorage['_datos_'] ),
        auth;

    console.log(data); 
    // No acaba de funcionar del tot bé
    if(data == 1){ //Me gusta
        document.getElementById("nmg").disabled = true;
        console.log("hola mg");
    } else if (data == 0){ //No me gusta
        document.getElementById("mg").disabled = true;
        console.log("hola mg");
    }

    if(tipo == "mg"){ url += "megusta"; }
    else if(tipo == "nmg"){ url += "nomegusta"; }

    auth = usu.LOGIN + ':' + usu.TOKEN; //parte de la cabecera

    fetch(url,  {   method:'POST',
                    headers:{'Authorization':auth}
                }
    ).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
            });
        }
    }).catch(function(error){
        console.log(error);
    });
}

function getPublicacionFotos(id_p){
    var url = `./api/publicaciones/${id_p}/fotos`;
        galeria = document.getElementsByClassName('galeria')[0];

    fetch(url)
        .then(function(res){
            if(res.ok){
                res.json().then(function(data) {
                    console.log(data);
                    let html = '';

                    data.FILAS.forEach(e => {
                        console.log(e);
                        html +=`<div>
                                    <img src="fotos/pubs/${e.archivo}" alt="Foto ${e.autor}">
                                    <p>${e.descripcion}</p>
                                </div>`;
                    });
                    galeria.insertAdjacentHTML("beforeend", html);
                });
            }
        }).catch(function(err) { 
        console.log('Fetch Error: ' + err);
    });
}

function mostrarFotos(){
    let galeria = document.getElementsByClassName('galeria')[0],
        boton = document.querySelector('#mostrar');

    if (galeria.style.display === "none") {
        galeria.style.display = "grid";
        boton.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ocultar';
    } else {
        galeria.style.display = "none";
        boton.innerHTML = '<i class="fa-solid fa-eye"></i> Mostrar';
    }
}

/* seccio comentaris */
function getComentarios(id_p){
    var url = `./api/publicaciones/${id_p}/comentarios`;
        comentarios = document.getElementById('comentarios'),
        nComentarios = 0,
        logueado = usuarioLogueado();

    fetch(url)
        .then(function(res){
            if(res.ok){
                res.json().then(function(data) {
                    console.log(data);
                    let html = '<h4><i class="fa-sharp fa-regular fa-comment"></i> Comentarios</h4>',
                        fecha,
                        nC = document.getElementById("nComentarios");

                    nComentarios = data.FILAS.length;
                    nC.innerText = nComentarios;
                    
                    data.FILAS.forEach(e => {
                        console.log(e);
                        fecha = formatoFecha(e.fechaHora); //devuelve decha con formato indicado en la practica
                        nComentarios++;

                        html +=`<article class="cajita">
                                    <img src="fotos/usuarios/${e.foto}" alt="Foto ${e.login}">
                                    <div class="comment">
                                        <h5>${e.nombre}</h5>
                                        <p><time datetime="${e.fechaHora}">${fecha}</time></p>
                                        <p>${e.texto}</p>
                                    </div>
                                </article>`;
                    });
                    if(logueado){
                        formComentario();
                    } else{
                        html += '<p>Tienes que estar logueado para poder dejar un comentario <a href="login.html">Inicia Sesión</a></p>';
                    }
                    comentarios.innerHTML = html;
                });
            }
        }).catch(function(err) {
        console.log('Fetch Error: ' + err);
    });
}

function formatoFecha(fecha) {
    let f = new Date(fecha),
        diaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][f.getDay()],
        mesos = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        mes = mesos[f.getMonth()],
        dia = f.getDate(),
        any = f.getFullYear();
    
    return `${diaSemana}, ${dia} de ${mes} de ${any}`;
}

//només si estás logejat
function formComentario(){
    var url = `./formComentario.html`; //pagina externa a publucacion.html
        comentarios = document.getElementById('comentarios');

    //GET para obtener el contenido del formulario
    fetch(url)
        .then(respuesta => respuesta.text())
        .then(html => {
            comentarios.insertAdjacentHTML("beforeend", html);
        })
        .catch(function(err) {
            console.log('Error Fetch formComentario.html: ' + err);
        });
}

function postComentario(frm){
    let id_p = getParametrosURL(),
        url = `./api/publicaciones/${id_p}/comentarios`,
        fd = new FormData(frm),
        usu = JSON.parse( sessionStorage['_datos_'] ),
        auth;

    auth = usu.LOGIN + ':' + usu.TOKEN; //parte de la cabecera
    console.log(auth);
    fetch(url,  {   method:'POST',
                    body:fd,
                    headers:{'Authorization':auth}
                }
    ).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                console.log(datos);
                let dialogo = document.createElement('dialog'),
                    html = '';
                
                html +=`<h3>Mensaje enviado</h3>
                        <p>Se ha guardado correctamente el comentario</p>
                        <button onclick="cerrarDialogo(0);" class="boton">Cerrar</button>`;
                
                dialogo.innerHTML = html;
                document.body.appendChild(dialogo);
                dialogo.showModal();
            });
        }
        frm.reset(); //neteja
        getComentarios(id_p); //afegix el nou comentari
    }).catch(function(error){
        console.log(error);
    });

    return false; //cancela la acción por defecto del evento
}

//PREGUNTAR JAVIER CODI NUEVA FOTO

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
        let r = xhr.response, //"r" es com el "data"
            dialogo = document.createElement('dialog'),
            html = '';
        console.log(r);

        if(r.RESULTADO == 'OK'){ //es lo que posa el json de resposta
            html += `<h3>Bienvenido ${r.NOMBRE}</h3>
                     <p>Última conexión: ${r.ULTIMO_ACCESO}</p>`;
            html += '<button onclick="cerrarDialogo(0); redirigir();" class="boton">Cerrar</button>';

            sessionStorage['_datos_'] = JSON.stringify(r);
            console.log( JSON.parse(sessionStorage.getItem('_datos_')).LOGIN);
        }
        else{
            console.log('error login');
            html += `<h3>Login incorrecto</h3>
                    <p>${r.DESCRIPCION}</p>
                    <button onclick="cerrarDialogo(0); foco('login');" class="boton">Cerrar</button>`;
        }
        dialogo.innerHTML = html;
        document.body.appendChild(dialogo);
        dialogo.showModal();
    }
    xhr.send(fd); //enviem la informació fd
}

function foco(campo){ //pone foco en un campo de formulario
    document.getElementById(campo).focus();
}

function cerrarDialogo(valor){
    console.log(valor);
    document.querySelector('dialog').close(); //en açò NOMÉS no es borra del html
    document.querySelector('dialog').remove(); //en açò si
}

function hacerLogout(){
    let xhr = new XMLHttpRequest(),
        url = 'api/usuarios/logout',
        usu = JSON.parse( sessionStorage['_datos_'] ),
        auth;

    xhr.open('POST', url, true);
    xhr.responseType = 'json';

    xhr.onload = function(){
        let r = xhr.response;
        console.log(r);
    }
    auth = usu.LOGIN + ':' + usu.TOKEN;
    xhr.setRequestHeader('Authorization', auth);

    xhr.send();
    clearStorage();
}

/* ------------- CODI BUSCAR.HTML ------------- */
function buscar(evt){
    evt.preventDefault();

    let frm = evt.currentTarget,
        fd = new FormData(frm),
        contiene = fd.get('contiene'),
        desde = fd.get('desde'),
        hasta = fd.get('hasta'),
        ubi = fd.get('ubi'),

        resultado = document.getElementById("resultado"),
        url = "api/publicaciones?"; //con técnica building blocks

    console.log(contiene+" "+desde+" "+hasta+" "+ubi);

    if (contiene)   { url += `&t=${contiene}`; }
    if (desde)      { url += `&fd=${desde}`; }
    if (hasta)      { url += `&fh=${hasta}`; }
    if (ubi)        { url += `&z=${ubi}`; }
    url += "&pag=" + pag + "&lpag=6";

    fetch(url)
        .then(function(res){
            if(res.ok){
                res.json().then(function(data) { 
                    console.log(data);

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
                    resultado.innerHTML = html;

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

/* ------------------- CODI REGUSTRO.HTML ------------------- */
// Funcion que sube y muestra la imagen del formulario
function subirImagen(){
    const input = document.querySelector('#foto'),
          image = document.querySelector("#img3");

    //Revisamos que el input tenga contenido
    if (input.files && input.files[0]) { 
        // Revisamos que sea <300kb
        console.log(input.files[0].size);
        if(input.files[0].size / 1024 <= 300){ // Es mas pequeño de 300kb
            var reader = new FileReader(); 
            // Asignamos la imagen a un elemento img
            reader.onload = function(e) { 
                image.src = e.target.result;
                image.style.display = "flex";
            }
            reader.readAsDataURL(input.files[0]);
        }
        else{
            console.log("El archivo pesa mucho"); // Mensaje de error
        }
    }
}

function hacerRegistro(evt){ 
    evt.preventDefault();//cancela la acción por defecto del evento
    var resul = false;
   
    disponible().then((resultado) => {
        resul = resultado;
        
        var contr = contrasenyas();
        console.log("resul" + resul + "contrasenyas" + contr);
        if(resul && contr){

          /*  let url ='api/usuarios/registro';
            const nombre=document.querySelector("#nombre"),
            login = document.querySelector("#login"),
            pwd   = document.querySelector("#pwd"),
            pwd2  = document.querySelector("#pwd2"),
            mail=document.querySelector("#email"),
            foto  = document.querySelector("#foto");
    
            // creamos un FormData
            var formData = new FormData();
            formData.append('nombre', nombre.value);
            formData.append('login', login.value);
            formData.append('pwd', pwd.value);
            formData.append('pwd2', pwd2.value);
            formData.append('email', mail.value);
            formData.append('foto', foto.files[0])
            
            fetch(url, {'method':'POST', 'body':formData}).then(function(response){
            if (!response.ok) {
            response.json().then(function(datos) {
            console.log(datos);
            console.log("no funciona")
            });
            }
            response.json().then(function(datos) {
            console.log(datos);
            console.log('Usuario introducido a base de datos');
            
            //document.getElementById("registroForm").reset();
            });
            }, function(response) {
            console.log('ERROR');
            
            });
            return false;*/

            const nombre=document.querySelector("#nombre"),
                login = document.querySelector("#login"),
                pwd   = document.querySelector("#pwd"),
                pwd2  = document.querySelector("#pwd2"),
                mail=document.querySelector("#email"),
                foto  = document.querySelector("#foto");
    
            var formData = new FormData();
            formData.append('nombre', nombre.value);
            formData.append('login', login.value);
            formData.append('pwd', pwd.value);
            formData.append('pwd2', pwd2.value);
            formData.append('email', mail.value);
            formData.append('foto', foto.files[0])

            console.log("REALIZO EL LOGIN")
            //let frm = document.querySelector('#form_register');
            //console.log(frm);
            xhr=new XMLHttpRequest(),
            url='api/usuarios/registro';
               
            console.log("formulario"+formData);

            xhr.open('POST', url, true);
            xhr.responseType = 'json';

            xhr.onload = function(){                   
                console.log("Funciono?"+xhr+xhr.response);
                let r = xhr.response;
                console.log("De momento");
                console.log(r.RESULTADO);

                if(r.RESULTADO == 'OK'){
                    let dialogo = document.createElement('dialog'),
                        html = '';
                        html += '<h3>Registro correcto ';
                        html += r.LOGIN; //los campos son en mayúsculas
                        html += '</h3>';
                        html += '<p> El registro se ha realizado correctamente</p>';
                        html += '<button onclick="cerrarDialogoLogin(0);">Login </button>';
                        dialogo.innerHTML = html;

                    document.body.appendChild(dialogo); //accedo al body y se lo añado
                    dialogo.showModal();
                }
            }
            xhr.send(formData)
        } else console.log("No funciono");
    });
}

//Para saber si el nombre de usuario está disponible
function disponible(){
    return new Promise(resolve => {
        const nuevoUsuario = document.getElementById("login").value,
            url = `./api/usuarios/${nuevoUsuario}`;
    
        if(nuevoUsuario != ""){
            fetch(url) // enviar peticion a la api, por defecto GET
                .then(response => {
                    const mensajeError = document.querySelector(".errorUser");
                    if(response.ok)
                        // Proceso de login correcto
                        response.json().then(function(data) {                     
                            if(data.DISPONIBLE === true)
                                console.log("Disponible");  
                            else
                                console.log("No disponible");
                             
                            resolve(data.DISPONIBLE);
                        });
                    else {
                        mensajeError.setAttribute("style", "none");   
                    }
                }).catch(function(err) {
                    console.log('Fetch Error: ' + err);
                    resolve(false);
                });
        }
        else{ resolve(false); }
    });
}

function contrasenyas(){
    const pass1 = document.querySelector("#pwd").value,
        pass2 = document.querySelector("#pwd2").value,
        pwd = document.querySelector("#pwd").parentNode;

    if(pass1 == pass2){
        if(document.querySelector('aviso')){
            document.querySelector('aviso').remove();
        }
        console.log("Entro2");
        return true;
    }
    else { 
        if(!document.querySelector('aviso')){
            console.log("Entro3");
            let aviso_form = document.querySelector("#form_register"),
                aviso = document.createElement('aviso'),
                html = '';

            html += '<p>Las contraseñas deben coincidir</p>';
            pwd.insertAdjacentHTML('afterend', html);
            aviso.innerHTML = html; //posible borrado pa que no isca baix
            aviso_form.appendChild(aviso);
        }
        return false
    };
}

function cerrarDialogoLogin(valor){
    console.log(valor);
    document.querySelector('dialog').close();//cerrar
    document.querySelector('dialog').remove();//eliminar
    window.location.href='login.html';
}

var cont = 0;
function comprueba_log(){
    var in_log = document.querySelector("#l_login"),
        resul = false;

    disponible().then((resultado) => {
        resul = resultado;
        if(!resul){
            if(cont == 0){
                cont++;
                let html = '<p id=aviso>El login no está disponible</p>';

                in_log.insertAdjacentHTML('afterend', html);
            }
        } else if(cont != 0){
            const eliminar = document.querySelector('#aviso');
            eliminar.remove();
            cont--;
        }
    });
}