//Variables
let url = 'https://rickandmortyapi.com/api/character/?page=1'

//EventListener
cargarREST()
document.getElementById('anteriorBtn').addEventListener('click', personajesAnteriores)
document.getElementById('siguienteBtn').addEventListener('click', personajesSiguientes)


//Funciones
//Funcion al clickear boton "siguiente" para mostar mas personajes
function personajesSiguientes() {
    fetch(url)
        .then(function (res){
            return res.json()
        })
        .then(function (personajes) {

            //Tomar el link para ir a la pagina siguiente
            let listaPersonajes = personajes['info'].next
            //Reescribo el link los nuevos personajes
            url = listaPersonajes
            
            //Imprimir Datos de los personajes
            cargarREST()
            
        })
}

//Funcion al clickear boton "anterior" para mostar personajes anteriores
function personajesAnteriores() {
    fetch(url)
        .then(function (res){
            return res.json()
        })
        .then(function (personajes) {

            //Tomar el link para ir a la anterior pagina
            let listaPersonajes = personajes['info'].prev

            //Verifico que halla pagina anterior
            if(listaPersonajes === null){
                //Si no hay mas paginas anteriores, deshabilito el boton
                document.getElementById('anteriorBtn').setAttribute("disabled","")
            }else{
                //Sino reescribo el link los nuevos personajes
                url = listaPersonajes
            }
            
            //Imprimir Datos de los personajes
            cargarREST()
            
        })
}



function cargarREST() {
    fetch(url)
        .then(function (res){
            return res.json()
        })
        .then(function (personajes) {
            //Variable html donde se imprimiran los datos
            let html = '';
            //Accedo al arreglo de objetos para accerder a cada personaje
            let listaPersonajes = personajes['results']
            //Accedo a cada personaje
            listaPersonajes.forEach(function(personaje) {

                html+=
                `
                    <div class="personaje">
                        <img src=${personaje.image} class="personaje">
                        <span>${personaje.name}</span>
                    </div>    
                `
            });
            //imprimir datos en el div llamado "resultado"
            document.getElementById('personajes').innerHTML = html
        })
}

