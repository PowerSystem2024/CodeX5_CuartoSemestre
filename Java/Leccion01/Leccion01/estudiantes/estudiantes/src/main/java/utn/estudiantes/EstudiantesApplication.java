package utn.estudiantes;

import java.util.List;
import java.util.Scanner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import utn.estudiantes.modelo.Estudiante;
import utn.estudiantes.servicio.EstudianteServicio;

@SpringBootApplication

public class EstudiantesApplication implements CommandLineRunner {
	@Autowired
	private EstudianteServicio estudianteServicio;
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator();

	public static void main(String[] args) {
		logger.info("Iniciando la aplicacion...");
		//Levantar la fabrica de Spring
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicacion Finalizada!");
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl+"Ejecutando el metodo run de Spring"+nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while (!salir){
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		}//fin del while

	}
	private void mostrarMenu(){
		//logger.info(nl);
		logger.info("""
				******** Sistema de estudiantes ********
				1- Listar estudiantes
				2- Buscar estudiante
				3- Agregar estudiante
				4- Modificar estudiante
				5- Eliminar estudiante
				6- Salir
				Ingrese una opcion: """);
	}




	private boolean ejecutarOpciones(Scanner consola) {
		var opcion = Integer.parseInt(consola.nextLine());
		var salir = false;
		switch (opcion) {
			case 1 -> { // Listar estudiantes
				logger.info(nl + "Listado de estudiantes :" + nl);
				List<Estudiante> estudiantes = estudianteServicio.listarEstudiantes();
				estudiantes.forEach(est -> logger.info(est.toString() + nl));
			}
			case 2 -> { // Buscar estudiante
				logger.info("Ingrese el ID del estudiante a buscar: ");
				var idEstudiante2022 = Integer.parseInt(consola.nextLine());
				Estudiante estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante2022);
				if (estudiante != null) {
					logger.info("Estudiante encontrado: " + estudiante + nl);
				} else {
					logger.info("Estudiante con ID " + idEstudiante2022 + " no encontrado");
				}
			}
			case 3 -> { // Agregar estudiante
				logger.info("Agregar estudiante: "+nl);
				logger.info("Nombre: ");
				var nombre = consola.nextLine();
				logger.info("Apellido: ");
				var apellido = consola.nextLine();
				logger.info("Telefono: ");
				var telefono = consola.nextLine();
				logger.info("Email: ");
				var email = consola.nextLine();
				// Crear el objeto estudiante sin el id
				var estudiante = new Estudiante();
				estudiante.setNombre(nombre);
				estudiante.setApellido(apellido);
				estudiante.setTelefono(telefono);
				estudiante.setEmail(email);
				estudianteServicio.guardarEstudiante(estudiante);
				logger.info(nl+"Estudiante agregado con exito!"+nl);
			}
			case 4 -> { // Modificar estudiante
				logger.info("Modificar estudiante: "+nl);
				logger.info("Ingrese el ID del estudiante a modificar: ");
				var idEstudiante2022 = Integer.parseInt(consola.nextLine());
				// Buscar el estudiante existente a modificar
				Estudiante estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante2022);
				if (estudiante != null) {
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Telefono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();
					// Actualizar los datos del estudiante existente
					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);
					estudianteServicio.guardarEstudiante(estudiante);
					logger.info(nl+"Estudiante modificado con exito!"+nl);
				} else {
					logger.info("Estudiante con ID " + idEstudiante2022 + " no encontrado" + nl);
				}
			}
			case 5 -> { // Eliminar estudiante
				logger.info("Eliminar estudiante: "+nl);
				logger.info("Ingrese el ID del estudiante a eliminar: ");
				var idEstudiante2022 = Integer.parseInt(consola.nextLine());
				// Buscar el estudiante existente a eliminar
				var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante2022);
				if (estudiante != null) {
					estudianteServicio.eliminarEstudiante(estudiante);
					logger.info(nl+"Estudiante eliminado con exito!"+nl);
				} else {
					logger.info("Estudiante con ID " + idEstudiante2022 + " no encontrado" + nl);
				}
			}
			case 6 -> { // Salir
				logger.info("Saliendo del sistema..." + nl + nl);
				salir = true;
			}
			default -> logger.info("Opcion incorrecta. Ingrese un numero entre 1 y 6."+nl);
		} // fin del switch
		return salir;
	}
// Fin metodo ejecutarOpciones
}