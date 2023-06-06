//GET FETCH
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
 

//POST FETCH
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

//POST AJAX
function ajaxpost(){
    let fd = new FormData();
    fd.append('tablero', matrizJSON);
    var url = './api/comprobar';
    var peticion = {
        method: 'POST',
        body: fd
    };
    var xhr = new XMLHttpRequest();
    xhr.open(peticion.method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var datos = JSON.parse(xhr.responseText);
            console.log('DATOS', datos);
            console.log('La petición funcionó correctamente');
        } else {
            console.log('Error en la petición:', xhr.status);
        }
    };
    xhr.onerror = function () {
        console.log('Error de red:', xhr.status);
    };
    xhr.send(JSON.stringify(peticion.body));
}

//SESSION STORAGE
function ejSessionStorage(){

    sessionStorage.set('ejemplo', 'ejemplo'); //key: value, guardar en sesión

    let palabra = sessionStorage.getItem("ejemplo"); //obtener de sesión
    console.log(palabra);

    sessionStorage.remove("ejemplo"); //para borrar un key específico

    sessionStorage.clear(); //para borrar todo el sessionStorage
}
