class Usuario{
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `Nombre del usuario: ${this.nombre} ${this.apellido}`;
    };

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        return `Cantidad de mascotas: ${this.mascotas.length}`;
    }

    addBook(libro, autor){
    this.libros.push ({nombre: libro, autor: autor});
    }

    getBookNames(){
        return this.libros.map(book => book.nombre);
    }
}

//Construcción y declaración de usuario
const usuario = new Usuario("Agustin", "Romero", [{nombre: "La Guerra de los Mundos", autor: "H.G. Wells"}], ["Tortuga"]);
console.log(usuario);
//Nombre completo
console.log(usuario.getFullName());
//Agregar mascotas
usuario.addMascota("Perro");
usuario.addMascota("Gatitx")
//Conteo de mascotas
console.log(usuario.countMascotas());
//Agregar libros
usuario.addBook("El señor de los anillos", "Tolkien")
usuario.addBook("El Embajador", "Morris West")
//Conteo de libros
console.log(usuario.getBookNames());
