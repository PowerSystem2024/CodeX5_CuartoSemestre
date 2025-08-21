let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarjuego() {
    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
    function reiniciarJuego() {
    location.reload();
    }
    
    let botonPersonajeJugador = document.getElementById('boton-personaje');
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    
    let botonPunio = document.getElementById('boton-punio')
    botonPunio.addEventListener('click', ataquePunio)
    let botonPatada = document.getElementById('boton-patada')
    botonPatada.addEventListener('click', ataquePatada)
    let botonBarrida = document.getElementById('boton-barrida')
    botonBarrida.addEventListener('click', ataqueBarrida)
}

function seleccionarPersonajeJugador() {
    let SpanPersonajeJugador = document.getElementById('personaje-jugador');
    const personajes = ['zuko', 'katara', 'aang', 'toph'];
    for (let id of personajes) {
        if (document.getElementById(id).checked) {
            SpanPersonajeJugador.innerText = id.charAt(0).toUpperCase() + id.slice(1);
            seleccionarPersonajeEnemigo(); // Llama aquí para mostrar el enemigo
            return;
        }
    }
    alert("Por favor selecciona un personaje");
}

function seleccionarPersonajeEnemigo() {
    let SpanPersonajeEnemigo = document.getElementById('personaje-enemigo');
    const personajes = ['zuko', 'katara', 'aang', 'toph'];
    const indiceAleatorio = Math.floor(Math.random() * personajes.length);
    const personajeEnemigo = personajes[indiceAleatorio];
    SpanPersonajeEnemigo.innerText = personajeEnemigo.charAt(0).toUpperCase() + personajeEnemigo.slice(1);
}

function ataquePunio() {
    ataqueJugador = 'Punio'
    ataqueAleatorioEnemigo()
}

function ataquePatada() {
    ataqueJugador = 'Patada'
    ataqueAleatorioEnemigo()
}

function ataqueBarrida() {
    ataqueJugador = 'Barrida'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)

    if(ataqueAleatorio == 1) {
        ataqueEnemigo = 'Punio'
    }else if(ataqueAleatorio == 2) {
        ataqueEnemigo = 'Patada'
    }else {
        ataqueEnemigo = 'Barrida'
    }

    combate();
}

function combate(){
    //COMBATE
    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (ataqueJugador == 'Punio' && ataqueEnemigo == 'Barrida' ||
               ataqueJugador == 'Patada' && ataqueEnemigo == 'Punio' ||
               ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada') {
        crearMensaje("GANASTE");
        vidasEnemigo--; // Resta vida al enemigo 
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--; // Resta vida al jugador       
    }

    actualizarVidas();
    revisarFinDelJuego();

}

function actualizarVidas() {
    document.getElementById('vidas-jugador').innerText = vidasJugador;
    document.getElementById('vidas-enemigo').innerText = vidasEnemigo;
}

function revisarFinDelJuego() {
    if (vidasJugador === 0 || vidasEnemigo === 0) {
        let mensajeFinal = vidasJugador === 0 ? "---Has perdido el juego---" : "---Ganaste el juego---"
        alert(mensajeFinal);

        //Desactivar botones de ataque
        document.getElementById('boton-punio').disabled = true;
        document.getElementById('boton-patada').disabled = true;
        document.getElementById('boton-barrida').disabled = true;
    }
}

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('mensajes');
    let parrafo =  document.createElement('p')

    parrafo.innerHTML = 'Tu personaje ataco con ' + ataqueJugador + ', el personaje del enemigo atacó con  ' + ataqueEnemigo + ' ' + resultado

    sectionMensajes.appendChild(parrafo);
}

function aleatorio (min, max){
     return Math.floor(Math.random() * (max - min +1) + min)
}

//Mostar y ocultar modal de reglas
const modal = document.getElementById('modal-reglas');
const botonReglas = document.getElementById('boton-reglas');
const cerrarModal = document.getElementById('cerrar-modal');

botonReglas.addEventListener('click', () => {
    modal.style.display = 'flex';
});

cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener('load', iniciarjuego);