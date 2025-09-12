class Personaje {
    constructor(nombre, vidas = 3) {
        this.nombre = nombre;
        this.vidas = vidas;
    }

    perderVida() {
        this.vidas--;
    }

    estaVivo() {
        return this.vidas > 0;
    }
}

class Juego {
    constructor() {
        this.personajes = [];
        this.jugador = null;
        this.enemigo = null;
        this.ataques = ['Puño', 'Patada', 'Barrida'];

        // Referencias al DOM
        this.spanJugador = document.getElementById('personaje-jugador');
        this.spanEnemigo = document.getElementById('personaje-enemigo');
        this.vidasJugadorSpan = document.getElementById('vidas-jugador');
        this.vidasEnemigoSpan = document.getElementById('vidas-enemigo');
        this.sectionMensajes = document.getElementById('mensajes');
    }

    iniciar() {
        document.getElementById('boton-reiniciar')
            .addEventListener('click', () => location.reload());

        this.ataques.forEach(ataque => {
            document.getElementById(`boton-${ataque.toLowerCase()}`)
                .addEventListener('click', () => this.seleccionarAtaque(ataque));
        });
    }

    agregarPersonaje(nombre) {
        this.personajes.push(new Personaje(nombre));
    }

    renderizarPersonajes() {
        const contenedor = document.getElementById("seleccionar-personaje");
        contenedor.innerHTML = "";

        // personajes disponibles
        this.personajes.forEach(personaje => {
            const div = document.createElement("div");
            div.classList.add("personaje");

            div.innerHTML = `
                <input type="radio" name="personaje" id="${personaje.nombre.toLowerCase()}"/>
                <label for="${personaje.nombre.toLowerCase()}">
                    ${personaje.nombre}
                </label>
            `;

            contenedor.appendChild(div);
        });

        // input para crear personaje
        const input = document.createElement("input");
        input.type = "text";
        input.id = "nuevo-personaje";
        input.placeholder = "Nombre del nuevo personaje";
        contenedor.appendChild(input);

        const botonCrear = document.createElement("button");
        botonCrear.id = "boton-crear";
        botonCrear.textContent = "Agregar Personaje";
        contenedor.appendChild(botonCrear);

        botonCrear.addEventListener("click", () => this.crearNuevoPersonaje());

        // botón seleccionar
        
        const botonSeleccionar = document.createElement("button");
        botonSeleccionar.id = "boton-personaje";
        botonSeleccionar.textContent = "Seleccionar";
        contenedor.appendChild(botonSeleccionar);

        botonSeleccionar.addEventListener("click", () => this.seleccionarJugador());
    }

    crearNuevoPersonaje() {
        const input = document.getElementById("nuevo-personaje");
        const nombre = input.value.trim();
        if (nombre) {
            this.agregarPersonaje(nombre);
            this.renderizarPersonajes();
            input.value = "";
        } else {
            alert("Escribe un nombre para el personaje");
        }
    }

    seleccionarJugador() {
        const seleccionado = document.querySelector('input[name="personaje"]:checked');
        if (seleccionado) {
            this.jugador = this.personajes.find(p => p.nombre.toLowerCase() === seleccionado.id);
            this.spanJugador.innerText = this.jugador.nombre;
            this.seleccionarEnemigo();
        } else {
            alert("Por favor selecciona un personaje");
        }
    }

    seleccionarEnemigo() {
        const indiceAleatorio = this.aleatorio(0, this.personajes.length - 1);
        this.enemigo = this.personajes[indiceAleatorio];
        this.spanEnemigo.innerText = this.enemigo.nombre;
    }

    seleccionarAtaque(ataqueJugador) {
        const ataqueEnemigo = this.ataques[this.aleatorio(0, this.ataques.length - 1)];
        const resultado = this.combate(ataqueJugador, ataqueEnemigo);

        this.crearMensaje(ataqueJugador, ataqueEnemigo, resultado);
        this.actualizarVidas();
        this.revisarFinDelJuego();
    }

    combate(ataqueJugador, ataqueEnemigo) {
        if (ataqueJugador === ataqueEnemigo) {
            return "EMPATE";
        } else if (
            (ataqueJugador === 'Puño' && ataqueEnemigo === 'Barrida') ||
            (ataqueJugador === 'Patada' && ataqueEnemigo === 'Puño') ||
            (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
        ) {
            this.enemigo.perderVida();
            return "GANASTE";
        } else {
            this.jugador.perderVida();
            return "PERDISTE";
        }
    }

    actualizarVidas() {
        this.vidasJugadorSpan.innerText = this.jugador.vidas;
        this.vidasEnemigoSpan.innerText = this.enemigo.vidas;
    }

    revisarFinDelJuego() {
        if (!this.jugador.estaVivo() || !this.enemigo.estaVivo()) {
            alert(this.jugador.estaVivo() ? "--- HAS GANADO EL JUEGO ---" : "--- HAS PERDIDO EL JUEGO ---");
            this.ataques.forEach(ataque => {
                document.getElementById(`boton-${ataque.toLowerCase()}`).disabled = true;
            });
        }
    }

    crearMensaje(ataqueJugador, ataqueEnemigo, resultado) {
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `${this.jugador.nombre} atacó con ${ataqueJugador}, 
                             ${this.enemigo.nombre} atacó con ${ataqueEnemigo}. 
                             <b>${resultado}</b>`;
        this.sectionMensajes.appendChild(parrafo);
    }

    aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

// --- INICIALIZACIÓN DEL JUEGO ---
const juego = new Juego();

// Personajes base (sin imágenes)
juego.agregarPersonaje("Zuko");
juego.agregarPersonaje("Katara");
juego.agregarPersonaje("Aang");
juego.agregarPersonaje("Toph");

window.addEventListener('load', () => {
    juego.renderizarPersonajes();
    juego.iniciar();
});
