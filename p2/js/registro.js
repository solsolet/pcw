
function registrar(){
let  pwd1= document.getElementById(contrasenya1);
let pwd2=document.getElementById();

}

//ver cómo hacer que cuando se cambie de campo sea cuandos e comprueba la petición

//para ver si existe o no en la base de datos, si ya existe no se podrá introducir un login con ese nombre
evt.preventDefault();//cancela la acción por defecto del evento

let frm=evt.currentTarget,
    xhr=new XMLHttpRequest(),
    url='api/usuarios/login'
    fd=new FormData(frm);
   
xhr.open('GET', URL,TRUE);
xhr.responseType='json';

xhr.onload=function(){
    let r=xhr.response;
    console.log(r);

    if(r.RESULTADO=='OK'){
        if(r.DISPONIBLE==false){
            //se puede realizar el registro
        }else
       
    }
    else{
        console.log('error');
    }


//comprobar si contraseña y repetir contraseña son iguales



//si no son iguales mostrar un texto abajo indicándolo


//mensaje modal para decir que el login se ha realizado correctamente
}