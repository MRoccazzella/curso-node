
class Container{
    //CONSTRUCTOR
    constructor(route){
        this.route = route
    }
    //METODOS
    
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.route, "utf8")
            const elementos = JSON.parse(contenido)
            return elementos
        }
        catch(error){
            console.log(`fallo lectura `,error)
            
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
}
const archivo = new Container('archivo.json')
const fs = require('fs')
const app = require('express')();
const PORT = process.env.PORT || 8080;
const filterRandom = (limite) => {
    return parseInt(Math.random()*limite) + 1
}

app.get('/productos', (req, res) =>{
    
    archivo.getAll()
    .then((data) => res.send({data}))
    .catch((error) => console.log({error}))
})
app.get('/productoRandom', (req, res) =>{
    
    archivo.getAll()
    .then((data) => {
        const limite = data.length
        const random = filterRandom(limite)
        archivo.getById(random)
        .then((data) => res.send(data))
        .catch((error) => console.log({error}))

    })
    .catch((error) => console.log({error}))
})

app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`));
