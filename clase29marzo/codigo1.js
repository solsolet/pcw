(function(){
    if(!sessionSotrage['_datos_']){
        location.href='index.html';
    }
})();

function hacerLogin(evt){
    evt.preventDefault();//cancela la acción por defecto del evento

    let frm=evt.currentTarget,
        xhr=new XMLHttpRequest(),
        url='api/usuarios/login'
        fd=new FormData(frm);
       
    xhr.open('POST', URL,TRUE);
    xhr.responseType='json';

    xhr.onload=function(){
        let r=xhr.response;
        console.log(r);

        if(r.RESULTADO=='OK'){
            let dialogo= document.createElement('dialog'),
                html='';
                html += '<h3>Bienvenido';
                html +=r.NOMBRE; //los campos son en mayúsculas
                html += '</h3>';
                html+= '<button onclick="cerrarDialogo(0);">Cerrar </button>';
                dialogo.innerHTML=html;
                document.body.appendChild(dialogo); //accedo al body y se lo añado
                //dialogo.showModal();
                sessionStorage['_datos_']=JSON.stringify(r);

                console.log(JSON.parse(sessionStorage['_datos_']));
                console.log(_datos_LOGIN);
        }
        else{
            console.log('error');
        }
    }

    xhr.send(fd);//como es post le ponemos lo que queremos enviar dentro
}
function cerrarDialogo(valor){
    console.log(valor);
    document.querySelector('dialog').close();//cerrar
    document.querySelector('dialog').remove();//eliminar


}