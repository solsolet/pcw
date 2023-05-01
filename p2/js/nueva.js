function zonas(){
//rellenar el datalist de zonas
const inputZonas = document.getElementById('ubi');
const datalistZonas = document.getElementById('ubis');


  const term = inputZonas.value;
  datalistZonas.innerHTML = '';

 
    fetch(`api/zonas`).then(response =>response.json())
    .then(data=>{
            data.FILAS.forEach(item=>{
            const option = document.createElement('option');
            option.value = item.nombre;
            datalistZonas.appendChild(option);
        })

    })
    .catch(error=>console.error(error));

}
