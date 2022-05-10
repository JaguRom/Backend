const http = require ('http');
const express = require ('express');
const PORT = 8080
const fs = require('fs');

//Declaración de contenedor y métodos
class Contenedor {
    constructor (archivo) {
        this.archivo = archivo
    }

    save(object){
        fs.promises.readFile(this.archivo, "utf-8")
        .then(contenido => {
            if(contenido.length === 0){
            object.id = 1;
            let newCont = [object]
            fs.promises.writeFile(this.archivo, JSON.stringify(newCont, null, 2))
            .then(()=>console.log( `Archivo creado. Id: ${object.id}`)).catch((error)=>console.log(error))
            }else{
                let objLength = JSON.parse(contenido).length
                object.id = JSON.parse(contenido)[objLength - 1].id + 1
                let contenidoNuevo = JSON.parse(contenido)
                contenidoNuevo.push(object)
                fs.promises.writeFile(this.archivo, JSON.stringify(contenidoNuevo, null, 2))
                .then(()=>console.log(`Archivo agregado. Id: ${object.id}`))
            }
        })
        .catch(()=>(console.log("Error")))
    }
    getAll() {
        let objetosEnArchivo = []
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        for(let i in dataObj){
            objetosEnArchivo.push(dataObj[i])
        }
        return JSON.stringify(objetosEnArchivo, null, 2)
    }
    getRandomProduct() {
        let data = fs.readFileSync(this.archivo);
        let objects = JSON.parse(data);
        let random = Math.floor(Math.random()*objects.length)
        return objects[random]
    }
}

let contenedor = new Contenedor('./productos.txt')

//Declaración app
const app = express();

//Servidor
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);
//Error
server.on("error", (error) => {
    console.log(error);
}
);

//Rutas
app.get('/', (req, res) => {
    res.send('Product Page');
}
);
// /Productos
app.get('/productos', (req, res) => {
    res.send(contenedor.getAll());
}
);
// Productos Random
app.get('/productosRandom', (req, res) => {
    res.send(contenedor.getRandomProduct());
}
)
