//ENTREGABLE DESAFIO 2 - ARCHIVOS
const {promises:fs} = require('fs')
class Productos{
    constructor(titulo,precio){
        this.titulo = titulo
        this.precio = precio
    }
}
class Container{
    //CONSTRUCTOR
    constructor(route){
        this.route = route
    }
    //METODOS
    async creacion(){
        try{
            await fs.writeFile(this.route,'')
        }
        catch(error){
            throw new Error (`El archivo no pudo crearse, error: ${error}`)
        }
    }
    
    async save(object){
        try {
            let contenido = await fs.readFile(this.route,"utf-8")
            if(contenido.includes('id')){
                let array = contenido.split('id')
                let id = array.length
                object.id = id + 1
            }
            else{
                object.id = 1
            }
            await fs.appendFile(this.route,JSON.stringify(object))

        }
        catch(error){
            throw new Error (`El archivo no pudo manipularse, error: ${error}`)
        }
    }
}
const archivo = new Container('./archivo.txt')
//const producto1 = new Productos('Fideos',200)
//const producto2 =new Productos('arroz',250)
archivo.creacion()
archivo.save({titulo: 'fideos', precio: 200})

