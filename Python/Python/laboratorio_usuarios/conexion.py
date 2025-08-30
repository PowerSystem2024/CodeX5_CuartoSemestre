from psycopg2 import pool
from logger_base import log
import sys

class Conexion:
    _DATABASE = 'test_bd'
    _USERNAME = 'postgres'
    _PASSWORD = 'admin'
    _DB_PORT = '5432'
    _HOST = '127.0.0.1'
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtenerPool(cls):
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    cls._MIN_CON,
                    cls._MAX_CON,
                    host=cls._HOST,
                    user=cls._USERNAME,
                    password=cls._PASSWORD,
                    port=cls._DB_PORT,
                    database=cls._DATABASE
                )
                log.debug(f'Creación exitosa del pool de conexiones: {cls._pool}')
                return cls._pool
            except Exception as e:
                log.error(f'Ocurrió un error al obtener el pool de conexiones: {e}')
                sys.exit()
        else:
            return cls._pool

    @classmethod
    def obtenerConexion(cls):
        try:
            conexion = cls.obtenerPool().getconn()
            log.debug(f'Conexión obtenida del pool: {conexion}')
            return conexion
        except Exception as e:
            log.error(f'Error al obtener la conexión: {e}')
            sys.exit()

    @classmethod
    def liberarConexion(cls, conexion):
        try:
            cls.obtenerPool().putconn(conexion)
            log.debug(f'Regresamos la conexión al pool: {conexion}')
        except Exception as e:
            log.error(f'Error al liberar la conexión: {e}')

    @classmethod
    def cerrarConexiones(cls):
        try:
            cls.obtenerPool().closeall()
            log.debug('Se cerraron todas las conexiones del pool')
        except Exception as e:
            log.error(f'Error al cerrar conexiones: {e}')


if __name__ == '__main__':
    # Prueba rápida de conexión
    conexion = Conexion.obtenerConexion()
    Conexion.liberarConexion(conexion)
