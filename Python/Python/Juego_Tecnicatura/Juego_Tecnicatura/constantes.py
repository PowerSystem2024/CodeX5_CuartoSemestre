# constantes.py
import os

# Dimension de la pantalla, el alto y el ancho
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Especificamos los colores de la pantalla
COLOR_LASER = (0, 0, 255)  # azul

# Ruta base a 'assets' (esto es lo que usa tu main para sonidos)
ASSETS_PATH = os.path.join(os.path.dirname(__file__), 'assets')

# Rutas de los archivos (corrijo el typo y construyo rutas con os.path.join)
# Nota: si tus nombres de archivo son distintos, mantenelos igual en la carpeta assets
IMAGES_PATH = os.path.join(ASSETS_PATH, 'images')
SOUNDS_PATH = os.path.join(ASSETS_PATH, 'sounds')

IMPERIAL_MARCH_PATH = os.path.join(SOUNDS_PATH, 'Imperial March - Kenobi.mp3')
START_IMAGE_PATH = os.path.join(IMAGES_PATH, 'inicio', 'star.png') 
ESTRELLA_PATH = os.path.join(IMAGES_PATH, 'inicio', 'estrella.png')
FONDO1_PATH = os.path.join(IMAGES_PATH, 'fondo1.jpg')
