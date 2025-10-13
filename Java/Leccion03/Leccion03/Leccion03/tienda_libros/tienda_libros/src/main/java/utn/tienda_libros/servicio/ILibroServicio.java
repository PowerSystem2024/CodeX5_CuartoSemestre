package utn.tienda_libros.servicio;

import utn.tienda_libros.modelo.Libro;

import java.util.List;

public interface ILibroServicio {

    public List<Libro> listarLibros();

    public Libro buscarlibroPorId (Integer idLibro);

    public void guardarLibro(Libro libro);

    public void eliminarlibro(Libro libro);
}
