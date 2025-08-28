
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

const personajes = ['zuko', 'katara', 'aang', 'toph'];
const ataques = ['Punio', 'Patada', 'Barrida'];


const botonReiniciar = document.getElementById('boton-reiniciar');
const botonPersonajeJugador = document.getElementById('boton-personaje');
const botonPunio = document.getElementById('boton-punio');
const botonPatada = document.getElementById('boton-patada');
const botonBarrida = document.getElementById('boton-barrida');
const spanPersonajeJugador = document.getElementById('personaje-jugador');
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
const sectionMensajes = document.getElementById('mensajes');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');


const modal = document.getElementById('modal-reglas');
const botonReglas = document.getElementById('boton-reglas');
const cerrarModal = document.getElementById('cerrar-modal');

function iniciarJuego() {
    botonReiniciar.addEventListener('click', () => location.reload());
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);

    botonPunio.addEventListener('click', () => ataqueJugadorAccion('Punio'));
    botonPatada.addEventListener('click', () => ataqueJugadorAccion('Patada'));
    botonBarrida.addEventListener('click', () => ataqueJugadorAccion('Barrida'));
}

function seleccionarPersonajeJugador() {
    for (const id of personajes) {
        if (document.getElementById(id).checked) {
            spanPersonajeJugador.innerText = capitalizar(id);
            seleccionarPersonajeEnemigo();
            return;
        }
    }
    alert("Por favor selecciona un personaje");
}

function seleccionarPersonajeEnemigo() {
    const personajeEnemigo = personajes[aleatorio(0, personajes.length - 1)];
    spanPersonajeEnemigo.innerText = capitalizar(personajeEnemigo);
}

function ataqueJugadorAccion(ataque) {
    ataqueJugador = ataque;
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    ataqueEnemigo = ataques[aleatorio(0, ataques.length - 1)];
    combate();
}

function combate() {
    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
    }

    actualizarVidas();
    revisarFinDelJuego();
}

function actualizarVidas() {
    spanVidasJugador.innerText = vidasJugador;
    spanVidasEnemigo.innerText = vidasEnemigo;
}

function revisarFinDelJuego() {
    if (vidasJugador === 0 || vidasEnemigo === 0) {
        const mensajeFinal = vidasJugador === 0 ? "---Has perdido el juego---" : "---Ganaste el juego---";
        alert(mensajeFinal);

        [botonPunio, botonPatada, botonBarrida].forEach(boton => boton.disabled = true);
    }
}

function crearMensaje(resultado) {
    const parrafo = document.createElement('p');
    parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el enemigo atacó con ${ataqueEnemigo} → ${resultado}`;
    sectionMensajes.appendChild(parrafo);
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}


botonReglas.addEventListener('click', () => modal.style.display = 'flex');
cerrarModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });


window.addEventListener('load', iniciarJuego);
