//ENTREGABLE DESAFIO 2 - ARCHIVOS
const {promises:fs} = require('fs')

class Container{
    //CONSTRUCTOR
    constructor(route){
        this.route = route
    }
    //METODOS
    
    async getAll(){
        try{
            const contenido = await fs.readFile(this.route, "utf8")
            const elementos = JSON.parse(contenido)
            return elementos
        }
        catch(error){
            if(error.code === "ENOENT"){
                await fs.writeFile(this.route,JSON.stringify([],null,3))
                return []
            }
            throw new Error (`${error.message}`)
            
        }
        
    }
    async save(object){
        
        try {
            const elementos = await this.getAll()
            const id = elementos.length === 0 ? 1 : elementos[elementos.length - 1].id + 1
            object.id = id
            elementos.push(object)
            await fs.writeFile(this.route,JSON.stringify(elementos,null,3))
            return object.id

        }
        catch(error){
            throw new Error (`El archivo no pudo manipularse, error: ${error.message}`)
        }
    }
    async getById(number){
        try {
            const elementos = await this.getAll()
            let elemento = elementos.find((element) => element.id == number)
            if(!elemento){
                return null
            }
            return {elemento}
        }
        catch(error){
            throw new Error (`El archivo no pudo manipularse, error: ${error.message}`)
        }
    }
    async deleteById(number){
        try {
            const elementos = await this.getAll()
            let elemento = elementos.find((element) => element.id == number)
            if (!elemento) return 'element not found'
            const elementosFiltrados = elementos.filter((element) => element.id != number)
            await fs.writeFile(this.route,JSON.stringify(elementosFiltrados,null,3))
        }
        catch(error){
            throw new Error (`El archivo no pudo manipularse, error: ${error.message}`)
        }
    }
    async deleteAll(){
        try {
            await fs.unlink(this.route)
        } catch (error) {
            throw new Error(`Error al Eliminar: ${error.message}`)
        } 
    }
}
const archivo = new Container('./archivo.json')
export { Container }

//archivo.getAll().then((data) => console.log({data})).catch((error) => console.log({error}))

//archivo.save({titulo: 'fideos', precio: 350}).then((data) => console.log({data})).catch((error) => console.log({error}))

//archivo.getById(21).then((data) => console.log({data})).catch((error) => console.log({error}))

//archivo.deleteById(19).then((data) => console.log({data})).catch((error) => console.log({error}))

//archivo.deleteAll()
