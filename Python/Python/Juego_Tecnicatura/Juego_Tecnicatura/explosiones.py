import pygame
import os
from constantes import ASSETS_PATH

class Explosion:
    def __init__(self):
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, "images", f'regularExplosion0{i:2}.png'))
        for i in range(9)]
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frane_rate = 0 # contenedor de los franes de la animacion
        self.franes = 20 # franes de la animacion
    
    def actualizar(self):
        self.frane_rate += 1
        if self.frane_rate >= self.franes:
            self.index += 1
            if self.index >= len(self.images):
                return False
            self.image = self.images[self.index]
        return True
    
    def dibujar (self, screen):
        screen.blit(self.image, self.rect.topleft)