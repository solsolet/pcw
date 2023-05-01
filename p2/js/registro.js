
var cont=0;
function comprueba_log(){
    var in_log=document.querySelector("#l_login");
    var resul=false;
   
    
    disponible().then((resultado) => {
    
        resul=resultado;
      
   
    if(!resul){
        if(cont==0){
            cont++;
            let aviso=document.createElement('aviso'),
            html='';
            html+='<p>El login no está disponible</p>';
            aviso.innerHTML=html;
            in_log.insertAdjacentHTML('afterend','<p id=aviso>El login no está disponible</p>');
        }
  
    }else if(cont!=0){
        const eliminar= document.querySelector('#aviso');
        eliminar.remove();
        cont--;
    }

    console.log(cont);
});
}




/*function imagen(){
const imagenPorDefecto="./img/";
const file=document.getElementById('foto');
const img=document.getElementById('img3');

file.addEventListener('cambiar', e=>{
    if(e.target.files[0]){
        const reader=new FileReader();
        reader.onload=function(e){
            img.src=e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    }else{
        img.src=defaultFile;
    }
});

}*/
// Funcion que sube y muestra la imagen del formulario
function subirImagen(){

    const input = document.querySelector('#foto'),
          image = document.querySelector("#img3");

    //Revisamos que el input tenga contenido
    if (input.files && input.files[0]) { 
        // Revisamos que sea menor de 300kb
        console.log(input.files[0].size);
        if(input.files[0].size / 1024 <= 300){
            // Es mas pequeño de 300kb
            var reader = new FileReader(); 
            // Asignamos la imagen a un elemento img
            reader.onload = function(e) { 
                image.src = e.target.result;
                image.style.display = "flex";
            }
            reader.readAsDataURL(input.files[0]);

            // Mensaje de error
         
        }
        else{
            // Mensaje de error
            console.log("El archivo pesa mucho")
        }
    }
}


function hacerRegistro(evt){
      
    evt.preventDefault();//cancela la acción por defecto del evento
    
    var resul=false;
   
    disponible().then((resultado) => {
            resul=resultado;
        
        
        var contr=contrasenyas();
        console.log("resul"+resul+"contrasenyas"+contr);
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
    
    
            // creamos un FormData
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
            xhr.open('POST',url,true);
            xhr.responseType='json';
            xhr.onload=function(){
                                
                console.log("Funciono?"+xhr+xhr.response);
                let r=xhr.response;
                    console.log("De momento");
                    console.log(r.RESULTADO);
                    if(r.RESULTADO=='OK'){
                        let dialogo= document.createElement('dialog'),
                            html='';
                            html += '<h3>Registro correcto ';
                            html +=r.LOGIN; //los campos son en mayúsculas
                            html += '</h3>';
                            html +='<p> El registro se ha realizado correctamente</p>';
                            html+= '<button onclick="cerrarDialogoLogin(0);">Login </button>';
                            dialogo.innerHTML=html;
                            document.body.appendChild(dialogo); //accedo al body y se lo añado
                            dialogo.showModal();
                    }
                
            
            }
        xhr.send(formData)
        }  else console.log("No funciono");

});



}



function disponible(){

 return new Promise(resolve => {
    const nuevoUsuario= document.getElementById("login").value;
   
    if(nuevoUsuario!= ""){
        // enviar peticion a la api 
        fetch(`./api/usuarios/${nuevoUsuario}`, {
            method: 'GET'
        })
        .then(response => {
            const mensajeError = document.querySelector(".errorUser");
            if(response.ok)
                // Proceso de login correcto
                response.json().then(function(data) { 

               
                    // El usuario es correcto
                  
                    if(data.DISPONIBLE === true){
                        console.log("Disponible");
                       // mensajeError.setAttribute("style", "display:none"); 
                        
                    // El usuario es incorrecto   
                    }else{
                        console.log("No disponible");
                        //mensajeError.setAttribute("style", "none");
                    }   
                    resolve(data.DISPONIBLE);

                }); 
            else{
                mensajeError.setAttribute("style", "none");
                
            }

        }).catch(function(err) {
            console.log('Fetch Error: ' + err);
            resolve(false);
        });
    
    }
    else{
        resolve(false);
    }
});

}


function contrasenyas(){
    const pass1 = document.querySelector("#pwd").value,
    pass2 = document.querySelector("#pwd2").value;
    console.log("Entro1");

if(pass1==pass2){
    if(document.querySelector('aviso')){
        document.querySelector('aviso').remove();
    
    }
    console.log("Entro2");
    
    return true;
}else{ 
    if(!document.querySelector('aviso')){
        console.log("Entro3");
        var aviso_form=document.querySelector("#form_register");
        let aviso=document.createElement('aviso'),
        html='';
        html+='<p>Las contrasñas deben coincidir</p>';
        aviso.innerHTML=html;
        aviso_form.appendChild(aviso);
    }
    return false};

}

function cerrarDialogoLogin(valor){
    console.log(valor);
    document.querySelector('dialog').close();//cerrar
    document.querySelector('dialog').remove();//eliminar
    window.location.href='login.html';
}