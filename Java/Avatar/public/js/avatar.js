console.log('avatar.js cargado');

class Personaje {
    constructor(nombre, imagen = '', vidas = 3) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
    }
    perderVida(){ this.vidas = Math.max(0, this.vidas - 1); }
    estaVivo(){ return this.vidas > 0; }
}

class Juego {
    constructor(){
        this.personajes = [];
        this.jugador = null;
        this.enemigo = null;
        this.ataques = ['Puño','Patada','Barrida'];

        // refs
        this.selCont = document.getElementById('seleccionar-personaje');
        this.spanJugador = document.getElementById('personaje-jugador');
        this.spanEnemigo = document.getElementById('personaje-enemigo');
        this.vidasJugador = document.getElementById('vidas-jugador');
        this.vidasEnemigo = document.getElementById('vidas-enemigo');
        this.mensajes = document.getElementById('mensajes');
        this.debug = document.getElementById('debugBox');
    }

    _idify(name){ return name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,''); }

    iniciar(){
        this.log('Iniciando juego...');
        document.getElementById('boton-reiniciar').addEventListener('click', () => location.reload());
        document.getElementById('boton-reglas').addEventListener('click', () => document.getElementById('modal-reglas').style.display = 'flex');
        document.getElementById('cerrar-modal').addEventListener('click', () => document.getElementById('modal-reglas').style.display = 'none');
        document.getElementById('cerrar-historial').addEventListener('click', () => document.getElementById('modal-historial').style.display = 'none');

        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('modal-reglas')) document.getElementById('modal-reglas').style.display='none';
            if (e.target === document.getElementById('modal-historial')) document.getElementById('modal-historial').style.display='none';
        });

        document.getElementById('boton-crear').addEventListener('click', () => this.crearNuevoPersonaje());

        this.ataques.forEach(a => {
            const btn = document.getElementById('boton-' + a.toLowerCase());
            if (btn) btn.addEventListener('click', () => this.seleccionarAtaque(a));
        });

        this.renderizarPersonajes();
    }

    log(msg){
        console.log(msg);
        if (this.debug) this.debug.textContent = 'debug: ' + msg;
    }

    agregarPersonaje(nombre, imagen=''){
        this.personajes.push(new Personaje(nombre, imagen, 3));
    }

    renderizarPersonajes(){
        this.selCont.innerHTML = '';
        this.personajes.forEach(p => {
            const id = this._idify(p.nombre);
            const div = document.createElement('div');
            div.className = 'personaje';
            div.innerHTML = `
                <input type="radio" name="personaje" id="${id}" />
                <label for="${id}">
                    <img src="${p.imagen || ''}" alt="${p.nombre}" onerror="this.style.opacity='.3'; this.style.border='2px dashed #ccc'">
                    <div>${p.nombre}</div>
                </label>
            `;
            this.selCont.appendChild(div);
        });

        const btnSel = document.createElement('button');
        btnSel.textContent = 'Seleccionar';
        btnSel.id = 'boton-personaje';
        btnSel.addEventListener('click', () => this.seleccionarJugador());
        this.selCont.appendChild(document.createElement('br'));
        this.selCont.appendChild(btnSel);
    }

    crearNuevoPersonaje(){
        const input = document.getElementById('nuevo-personaje');
        const nombre = input.value.trim();
        if (!nombre) { alert('Escribe un nombre para el personaje'); return; }
        this.agregarPersonaje(nombre, '');
        input.value = '';
        this.renderizarPersonajes();
        this.log('Personaje agregado: ' + nombre);
    }

    seleccionarJugador(){
        const sel = document.querySelector('input[name="personaje"]:checked');
        if (!sel){ alert('Selecciona un personaje primero'); return; }
        const id = sel.id;
        this.jugador = this.personajes.find(p => this._idify(p.nombre) === id);
        if (!this.jugador) { alert('Error al seleccionar personaje'); return; }
        this.spanJugador.textContent = this.jugador.nombre;
        this.vidasJugador.textContent = this.jugador.vidas;
        this.seleccionarEnemigo();
        this.log('Jugador seleccionado: ' + this.jugador.nombre);
    }

    seleccionarEnemigo(){
        const pool = this.personajes.filter(p => p !== this.jugador);
        const opciones = pool.length ? pool : this.personajes;
        const idx = this.aleatorio(0, opciones.length - 1);
        this.enemigo = opciones[idx];
        this.spanEnemigo.textContent = this.enemigo.nombre;
        this.vidasEnemigo.textContent = this.enemigo.vidas;
    }

    seleccionarAtaque(ataqueJugador){
        if (!this.jugador || !this.enemigo){ alert('Primero selecciona tu personaje'); return; }
        const ataqueEnemigo = this.ataques[this.aleatorio(0, this.ataques.length - 1)];
        const resultado = this.combate(ataqueJugador, ataqueEnemigo);
        this.crearMensaje(ataqueJugador, ataqueEnemigo, resultado);
        this.actualizarVidas();
        this.revisarFinDelJuego();
        if (ataqueJugador === 'Patada' || ataqueJugador === 'Barrida') this.mostrarHistorial();
    }

    combate(aJ, aE){
        if (aJ === aE) return 'EMPATE';
        if ((aJ==='Puño' && aE==='Barrida') || (aJ==='Patada' && aE==='Puño') || (aJ==='Barrida' && aE==='Patada')){
            this.enemigo.perderVida(); return 'GANASTE';
        } else { this.jugador.perderVida(); return 'PERDISTE'; }
    }

    crearMensaje(aJ, aE, res){
        const p = document.createElement('p');
        p.innerHTML = `<strong>${this.jugador.nombre}</strong> atacó con ${aJ}, <strong>${this.enemigo.nombre}</strong> atacó con ${aE}. <b>${res}</b>`;
        this.mensajes.appendChild(p);
        this.mensajes.scrollTop = this.mensajes.scrollHeight;
    }

    actualizarVidas(){
        this.vidasJugador.textContent = this.jugador.vidas;
        this.vidasEnemigo.textContent = this.enemigo.vidas;
    }

    revisarFinDelJuego(){
        if (!this.jugador.estaVivo() || !this.enemigo.estaVivo()){
            alert(this.jugador.estaVivo() ? '--- HAS GANADO ---' : '--- HAS PERDIDO ---');
            this.ataques.forEach(a => {
                const btn = document.getElementById('boton-' + a.toLowerCase());
                if (btn) btn.disabled = true;
            });
        }
    }

    mostrarHistorial(){
        const modal = document.getElementById('modal-historial');
        const contenido = document.getElementById('contenido-historial');
        contenido.innerHTML = this.mensajes.innerHTML || '<p>No hay combates aún</p>';
        modal.style.display = 'flex';
    }

    aleatorio(min,max){ return Math.floor(Math.random()*(max-min+1)+min); }
}

document.addEventListener('DOMContentLoaded', () => {
    const juego = new Juego();
    juego.agregarPersonaje('Zuko','zuko-img.webp');
    juego.agregarPersonaje('Katara','img-katara.webp');
    juego.agregarPersonaje('Aang','img-aang.webp');
    juego.agregarPersonaje('Toph','toph-img.webp');
    juego.iniciar();
    console.log('Juego inicializado');
});
