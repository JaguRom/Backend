const fs = require('fs');

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo
    }
    save(object) {
        let archivo = this.archivo;
        fs.promises.readFile(`./${archivo}`, "utf-8")
        .then (() =>(console.log("ok")))
        .then( data =>{
            if (data.length) {
                let longit = JSON.parse(data).length
                object.id = JSON.parse(data)[longit -1].id + 1
                async function agregar () {
                    try {
                        let contenidoNuevo = JSON.parse(contenido);
                        contenidoNuevo.push(object);
                        await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoNuevo, null, 2))
                        console.log(`Id del producto: ${object.id}`)
                    }
                    catch(error){
                        console.log(error)
                    }
                }
                agregar()
            } else {
                object.id=1
                async function iniciarJson(){
                    try{
                        let contenidoNuevo = [object]
                        await fs.promises.writeFile(`./${archivo}`,  JSON.stringify(contenidoNuevo, null, 2))
                        console.log(`Id del producto: ${object.id}`)
                    }
                    catch (error){
                        console.log("Error" + error)
                    }
                }
                iniciarJson()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}

const direccion = './data/contenedor.json';
const contenedor = new Contenedor("./productos.txt");
const producto1= {title: 'Producto 1', price: 100, thumbnail: 'https://via.placeholder.com/150'};
contenedor.save(producto1);