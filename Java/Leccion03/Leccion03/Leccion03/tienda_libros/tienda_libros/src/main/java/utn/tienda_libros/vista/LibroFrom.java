package utn.tienda_libros.vista;

import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.ILibroServicio;

import java.awt.Dimension;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.Toolkit;
import java.util.List;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LibroFrom extends JFrame {

    private final ILibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private DefaultTableModel tablaModeloLibros;

    // Campos de texto
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;

    // Botones (TODOS SE MANTIENEN EN LA UI)
    private JButton agregarButton; 
    private JButton modificarButton; 
    private JButton eliminarButton; 

    @Autowired
    public LibroFrom(ILibroServicio libroServicio) {
        this.libroServicio = libroServicio;
        iniciarForma();
        // El ActionListener para "Agregar" se configura en iniciarForma()
    }

    private void agregarLibro(){
        if(libroTexto.getText().isEmpty()){
            mostrarMensaje("Ingrese el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }

        try {
            var nombreLibro = libroTexto.getText();
            var autor = autorTexto.getText();
            // Validaciones básicas de número
            if (precioTexto.getText().isEmpty() || existenciasTexto.getText().isEmpty()) {
                mostrarMensaje("Los campos Precio y Existencias no pueden estar vacíos.");
                return;
            }
            var precio = Double.parseDouble(precioTexto.getText());
            var existencias = Integer.parseInt(existenciasTexto.getText());
            
            // Creación y guardado
            var libro = new Libro(null, nombreLibro, autor, precio, existencias);
            this.libroServicio.guardarLibro(libro);
            
            mostrarMensaje("Se agregó el libro: " + nombreLibro);
            limpiarFormulario();
            listarLibros(); // Actualizar la tabla
            
        } catch (NumberFormatException e) {
            mostrarMensaje("El precio y las existencias deben ser números válidos.");
        } catch (Exception e) {
            mostrarMensaje("Error al guardar el libro: " + e.getMessage());
        }
    }

    private void limpiarFormulario() {
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void iniciarForma() {
        panel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Tabla y modelo
        tablaModeloLibros = new DefaultTableModel();
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencia"};
        tablaModeloLibros.setColumnIdentifiers(cabecera);

        tablaLibros = new JTable(tablaModeloLibros);
        JScrollPane scrollPane = new JScrollPane(tablaLibros);
        
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 4; // Ajustado para que la tabla ocupe todo el ancho
        gbc.weightx = 1.0;
        gbc.weighty = 1.0;
        gbc.fill = GridBagConstraints.BOTH;
        panel.add(scrollPane, gbc);

        // --- INICIO DE FORMULARIO (Etiquetas y campos de texto) ---
        gbc.gridwidth = 1; // Volver a 1 columna de ancho para campos
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 0.0;
        gbc.weighty = 0.0;

        // Fila 1: Libro
        gbc.gridx = 0;
        gbc.gridy = 1;
        panel.add(new JLabel("Libro:"), gbc);
        gbc.gridx = 1;
        libroTexto = new JTextField(20);
        panel.add(libroTexto, gbc);

        // Fila 2: Autor
        gbc.gridx = 0;
        gbc.gridy = 2;
        panel.add(new JLabel("Autor:"), gbc);
        gbc.gridx = 1;
        autorTexto = new JTextField(20);
        panel.add(autorTexto, gbc);

        // Fila 3: Precio
        gbc.gridx = 0;
        gbc.gridy = 3;
        panel.add(new JLabel("Precio:"), gbc);
        gbc.gridx = 1;
        precioTexto = new JTextField(10);
        panel.add(precioTexto, gbc);

        // Fila 4: Existencias
        gbc.gridx = 0;
        gbc.gridy = 4;
        panel.add(new JLabel("Existencias:"), gbc);
        gbc.gridx = 1;
        existenciasTexto = new JTextField(10);
        panel.add(existenciasTexto, gbc);

        // --- BOTONES ---
        
        // Botón Agregar (Funcional)
        gbc.gridx = 2;
        gbc.gridy = 1;
        agregarButton = new JButton("Agregar");
        agregarButton.addActionListener(e -> agregarLibro()); // <--- FUNCIONALIDAD AQUÍ
        panel.add(agregarButton, gbc);

        // Botón Modificar (Inactivo)
        gbc.gridy = 2;
        modificarButton = new JButton("Modificar");
        // modificarButton.addActionListener(...) <-- NO AGREGAMOS LISTENER
        panel.add(modificarButton, gbc);

        // Botón Eliminar (Inactivo)
        gbc.gridy = 3;
        eliminarButton = new JButton("Eliminar");
        // eliminarButton.addActionListener(...) <-- NO AGREGAMOS LISTENER
        panel.add(eliminarButton, gbc);


        // Configuración de la Ventana
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        // Usamos pack() para que el tamaño se ajuste automáticamente al contenido
        pack(); 

        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth()) / 2;
        int y = (tamanioPantalla.height - getHeight()) / 2;
        setLocation(x, y);

        listarLibros();

        setVisible(true);
    }

    private void listarLibros() {
        tablaModeloLibros.setRowCount(0);
        
        // Se asume que ILibroServicio.listarLibros() devuelve List<Libro>
        List<Libro> libros = libroServicio.listarLibros();

        libros.forEach(libro -> {
            Object[] renglon = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            tablaModeloLibros.addRow(renglon);
        });
    }
}