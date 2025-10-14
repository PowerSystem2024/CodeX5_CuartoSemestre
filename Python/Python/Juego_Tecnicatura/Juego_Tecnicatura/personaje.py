import pygame
import os

class Personaje:
    def __init__(self, x, y):
        # Obtener la ruta absoluta del directorio actual
        base_path = os.path.dirname(__file__)
        images_path = os.path.join(base_path, 'assets_1', 'images')

        # Construir la ruta de la imagen del personaje
        self.image = pygame.image.load(os.path.join(images_path, 'personaje1.png'))
        self.image = pygame.transform.scale(self.image, (95, 95))
        self.shape = self.image.get_rect(center=(x, y))
        self.lasers = []
        self.energia = 100  # Barra de energía inicial

    def mover(self, dx, dy):
        self.shape.x += dx
        self.shape.y += dy

    def lanzar_laser(self):
        laser = Laser(self.shape.centerx, self.shape.top)
        self.lasers.append(laser)

    def recibir_dano(self):
        self.energia -= 10
        if self.energia <= 0:
            self.energia = 0
            return False
        return True

    def dibujar(self, screen):
        screen.blit(self.image, self.shape.topleft)
        for laser in self.lasers:
            laser.dibujar(screen)
            laser.mover()

        # Dibujar la barra de energía
        pygame.draw.rect(screen, (255, 0, 0), (10, 10, 100, 10))  # Barra de fondo
        pygame.draw.rect(screen, (0, 255, 0), (10, 10, self.energia, 10))  # Barra de energía

class Enemigo:
    def __init__(self, x, y):
        # Ajustar la ruta para cargar la imagen del enemigo
        base_path = os.path.dirname(__file__)
        images_path = os.path.join(base_path, 'assets_1', 'images')
        self.image = pygame.image.load(os.path.join(images_path, 'enemigo1.png'))
        self.image = pygame.transform.scale(self.image, (50, 50))
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y += 5  # Velocidad de movimiento del enemigo

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

class Laser:
    def __init__(self, x, y):
        # Ajustar la ruta para cargar la imagen del láser
        base_path = os.path.dirname(__file__)
        images_path = os.path.join(base_path, 'assets_1', 'images')
        self.image = pygame.image.load(os.path.join(images_path, 'lase1.png'))
        self.image = pygame.transform.scale(self.image, (int(self.image.get_width() * 2.0), int(self.image.get_height() * 2.0)))
        self.rect = self.image.get_rect(center=(x, y))

    def mover(self):
        self.rect.y -= 10  # Velocidad del láser

    def dibujar(self, screen):
        screen.blit(self.image, self.rect.topleft)

class Explosion:
    def __init__(self, x, y):
        # Ajustar la ruta para cargar las imágenes de la explosión
        base_path = os.path.dirname(__file__)
        images_path = os.path.join(base_path, 'assets_1', 'images')
        self.images = [pygame.image.load(os.path.join(images_path, 'regularExplosion.jpg'))]
        self.images[0] = pygame.transform.scale(self.images[0], (100, 100))
        self.index = 0  # Índice para la animación
        self.image = self.images[self.index]  # Imagen actual
        self.rect = self.image.get_rect(center=(x, y))  # Rectángulo de la imagen
        self.frame_rate = 0  # Contador de frames para la animación
        self.max_frames = 20  # Frames por imagen

    def actualizar(self):
        # Actualiza la animación
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False  # Termina la animación si se han mostrado todas las imágenes
            self.image = self.images[self.index]
        return True

    def dibujar(self, screen):
        # Dibuja la imagen en la pantalla
        screen.blit(self.image, self.rect.topleft)