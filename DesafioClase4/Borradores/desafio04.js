const fs = require('fs');

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo
    }
    save(object) {
        fs.promises.writeFile(this.archivo, JSON.stringify(object))
        .then(() => console.log('Archivo creado'))
        .then(() =>fs.promises.readFile(this.archivo, JSON.parse(object))

        .catch(err => console.log(err));
    };
     getNextId() {
        let data = fs.readFileSync(this.archivo);
        console.log(data)
         if(data === undefined){
            return 1
        } else {
            let maxId = 0;
            let objects = JSON.parse(data);
            for (let i = 0; i < objects.length; i++) {
                if (objects[i].id > maxId) {
                    maxId = objects[i].id;
                }
            }
            return maxId + 1;
        }
    }

    getById() {
        let data = fs.readFileSync(this.archivo);
        let objects = JSON.parse(data);
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].id == id) {
                return objects[i];
            }
        }
    };
    getAll() {
        let data = fs.readFileSync(this.archivo);
        let objects = JSON.parse(data);
        return objects;
    };
    deleteById() {
        let data = fs.readFileSync(this.archivo);
        let objects = JSON.parse(data);
        let newObjects = [];
        for (let i = 0; i < objects.length; i++) {
            if (objects[i].id != id) {
                newObjects.push(objects[i]);
            }
        }
        fs.writeFileSync(this.archivo, JSON.stringify(newObjects));
    };
    deleteAll() {
        fs.writeFileSync(this.archivo, JSON.stringify([]));
    };
}

const direccion = './data/contenedor.json';
const contenedor = new Contenedor("./productos.txt");
const producto1= {title: 'Producto 1', price: 100, thumbnail: 'https://via.placeholder.com/150'};
contenedor.save(producto1);
