class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
  
    getFullName() {
      return console.log(
        `El nombre del usuario es: ${this.nombre} ${this.apellido}`
      );
    }
  
    addMascota(mascota) {
      this.mascotas.push(mascota);
    }
  
    countMascotas() {
      return this.mascotas.length;
    }
  
    getCantidadMascotas(cantMascotas) {
      return console.log(`La cantidad de mascotas son: ${cantMascotas}`);
    }
  
    addBook(nombre, autor) {
      this.libros.push({
        nombre: nombre,
        autor: autor,
      });
    }
  
    getBookNames() {
      let arrayNombreLibros = [];
      this.libros.forEach((libro) => arrayNombreLibros.push(`${libro.nombre}.\nAutor: ${libro.autor}`));
      return arrayNombreLibros;
    }
  
    showBookNames(nombreLibros) {
      nombreLibros.forEach((nombre) => {
        console.log(`El nombre del libro es: ${nombre}.\n`);
      });
    }
  }
  
  const usuario = new Usuario(
    "Lionel",
    "Messi",
    [
      { nombre: "Una breve historia de casi todo",
        autor: "Bill Bryson" },
      { nombre: "Somos polvo de estrellas",
        autor: "Jose Maria Maza Sancho" },
    ],
    ["Perro", "Gato", "Tortuga"]
  );
 
  
function espacio(){
  console.log('\n');
}

usuario.getFullName();
espacio();
usuario.addMascota("Coballo");
let cantMascotas = usuario.countMascotas();
usuario.getCantidadMascotas(cantMascotas);
espacio();
usuario.addBook("Misery", "Stephen King");
let arrayNombreLibros = usuario.getBookNames();
usuario.showBookNames(arrayNombreLibros);