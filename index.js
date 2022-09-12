class Usuario {
    //Consstructor
    constructor(){
        this.nombre = 'Matias'
        this.apellido = 'Roccazzella'

        this.libros = [
            {nombre: 'El diario de Ana Frank', autor: 'Ana Frank'}
        ]

        this.mascotas = ['gato']
    }

    //Metodos
    getFullName(){
       return console.log(`el nombre completo del usuario es ${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        return this.mascotas.push(mascota)
    }
    countMascotas(){
        return console.log(this.mascotas.length)
    }
    addBook(name,aut){
        return this.libros.push({nombre: name, autor: aut})
    }
    getBookNames(){
        let nombresLibros = []
        for(let i = 0; i < this.libros.length; i ++ ){
            nombresLibros.push(this.libros[i].nombre)
        }
        return console.log(nombresLibros)
    }
}
const usuario = new Usuario

usuario.getFullName()
usuario.addMascota('perro')
usuario.countMascotas()
usuario.addBook('Legolandia', 'Legoman')
usuario.getBookNames()

console.log(usuario)