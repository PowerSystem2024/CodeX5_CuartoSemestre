from usuario import Usuario
from usuario_dao import UsuarioDAO
from conexion import Conexion

class MenuAppUsuario:
    @staticmethod
    def mostrar_menu():
        while True:
            print("\n=== Menú de Uusarios ===")
            print('1) Seleccionar usuarios')
            print('2) Insertar usuarios')
            print('3) Actualizar usuarios')
            print('4) Eliminar usuario')
            print('5) Salir')

            opcion = input('Seleccione una opción: ')

            if opcion == '1':
                MenuAppUsuario.seleccionar_usuario()
            elif opcion == '2':
                MenuAppUsuario.insertar_usuario()
            elif opcion == '3':
                MenuAppUsuario.actualizar_usuario()
            elif opcion == '4':
                MenuAppUsuario.eliminar_usuario()
            elif opcion == '5':
                print('Saliendo del sistema...')
                break
            else: 
                print('Opcion inválida')
    
    @staticmethod
    def seleccionar_usuario():
        usuarios = UsuarioDAO.seleccionar()
        print('\n--- Lista de Usuarios ---')
        for usuario in usuarios:
            print(usuario)
    
    @staticmethod
    def insertar_usuario():
        username = input('Ingrese su username: ')
        password = input('Ingrese su password: ')
        nuevo_usuario = Usuario(username=username, password=password)
        UsuarioDAO.insertar(nuevo_usuario)
        print('Usuario agregado correctamente')

    @staticmethod
    def actualizar_usuario():
        id_usuario = int(input('Ingrese ID del usuario a actualizar'))
        username = input('Nuevo username: ')
        password = input('Nuevo password: ')
        usuario = Usuario(id_usuario=id_usuario, username=username, password=password)
        UsuarioDAO.actualizar(usuario)
        print('Usuario actualizado correctamente.')

    @staticmethod
    def eliminar_usuario():
        id_usuario = int(input('Ingrese el ID del usuario a eliminar: '))
        usuario = Usuario(id_usuario=id_usuario)
        UsuarioDAO.eliminar(usuario)
        print('Usuario eliminado correctamente. ')

if __name__ == '__main__':
    MenuAppUsuario.mostrar_menu()
