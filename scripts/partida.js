class Partida {

    constructor(jugadorX, jugadorO) {
        this._jugadorX = jugadorX;
        this._jugadorO = jugadorO;
        this._jugadorQueTieneElTurno = jugadorX;
        this.colocarPosicionInicial();
    }
    get jugadorX() {
        return this._jugadorX;
    }
    get jugadorO() {
        return this._jugadorO;
    }
    get jugadorQueTieneElTurno() {
        return this._jugadorQueTieneElTurno;
    }
    _cambiarTurno() {
        this._jugadorQueTieneElTurno = (this._jugadorQueTieneElTurno.ficha == 'X') ? this._jugadorO : this._jugadorX;
        marcador.innerText = 'Es el turno de ' + this._jugadorQueTieneElTurno.ficha;
        if (this._jugadorQueTieneElTurno.tipo == 'humano') {
            Tablero.ponerManejadores();
        } else {
            this._juegaMaquina();
        }
    }
    colocarPosicionInicial() {
        marcador.innerText = 'Es el turno de ' + this._jugadorQueTieneElTurno.ficha;
        Tablero.posicionInicial();
        if (this._jugadorQueTieneElTurno.tipo == 'humano') {
            Tablero.ponerManejadores();
        } else {
            this._juegaMaquina();
        }
    }
    comprobarSituacion() {
        Tablero.quitarManejadores();
        if (Tablero.tieneTresEnRaya(this._jugadorQueTieneElTurno.ficha, Tablero.obtenerPosicion())) {
            marcador.innerText = `${this._jugadorQueTieneElTurno.ficha} ha ganado la partida.`;
            empezar.disabled = false;
        } else if (!Tablero.tieneCasillaLibre(Tablero.obtenerPosicion())) {
            marcador.innerText = 'La partida ha terminado en empate.';
            empezar.disabled = false;
        } else {
            this._cambiarTurno();
        }
    }
    _juegaMaquina() {
        let coordenadasParaJugar = Maquina.buscarJugada(this._jugadorQueTieneElTurno.ficha);
        let casilla = Tablero.obtenerCasilla(coordenadasParaJugar[0], coordenadasParaJugar[1]);
        Tablero.ponerFichaEnCasilla(this._jugadorQueTieneElTurno.ficha, casilla);
        this.comprobarSituacion();
    }
}