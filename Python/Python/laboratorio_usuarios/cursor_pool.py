from conexion import Conexion
from logger_base import log

class CursorDelPool:
    def __init__(self):
        self._conn = None
        self._cursor = None

    def __enter__(self):
        log.debug("Inicio del método __enter__")
        self._conn = Conexion.obtenerConexion()
        self._cursor = self._conn.cursor()
        return self._cursor

    def __exit__(self, tipo_excepcion, valor_excepcion, detalle_error):
        log.debug("Ejecución del método __exit__")
        if valor_excepcion:
            self._conn.rollback()
            log.error(f"Ocurrió una excepción: {valor_excepcion} {detalle_error}")
        else:
            self._conn.commit()
            log.debug("Commit de la transacción")
        self._cursor.close()
        Conexion.liberarConexion(self._conn)
