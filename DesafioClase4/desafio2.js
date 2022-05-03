const fs = require('fs');

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

    getById(number) {
        fs.promises.readFile(this.archivo, "utf-8")
        .then(contenido => {
            let parseContent= JSON.parse(contenido)
            console.log(parseContent)
            let findProductById = parseContent.find(element => element.id === number)
            if(findProductById === undefined ){
                return console.log("Product not found")
            } else {
                return console.log(findProductById)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    getAll() {
        let data = fs.readFileSync(this.archivo);
        let objects = JSON.parse(data);
        console.log (objects)
    }

    deleteById(id) {
        let data = fs.readFileSync(this.archivo);
        let objects = JSON.parse(data);
        let newObjects = [];
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].id != id) {
                newObjects.push(objects[i]);
            }
        }
        fs.writeFileSync(this.archivo, JSON.stringify(newObjects));
        console.log(newObjects)
    }
    deleteAll() {
        let archivo = this.archivo
        async function deleteItems(){
        try {
            await fs.promises.writeFile(archivo, "")
            console.log("Archivo eliminado")
            }
            catch (error) {
            console.log(error)
            }
        } deleteItems()
    }
}

const contenedor = new Contenedor("./productos.txt");
contenedor.save({title: 'Producto 1', price: 100, thumbnail: 'https://via.placeholder.com/150'});
//contenedor.getById(4)
//contenedor.getAll()
//contenedor.deleteById(2)
//contenedor.deleteAll()