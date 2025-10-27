import requests

def get_data(url):
    r = requests.get('https://dog.ceo/api/breeds/list/all')
    print(r.status_code)
    print(r.text)
    #En este archivo se define la función get_data que realiza una solicitud HTTP GET a una URL dada y luego imprime el código de estado y el texto de la respuesta.
    #En este caso es un string en formato JSON que contiene una lista de razas de perros.
    razas = r.json()
    for raza in razas.values(): #Utilizamos .values() para obtener los valores del diccionario
        print(f"Raza e los perros: {raza[5]}") #Estamos recorriendo la lista de razas y accediendo al sexto elemento de cada raza.

