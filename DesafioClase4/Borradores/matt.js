const fs = require('fs')

class Contenedor {

    constructor(archivo){
        this.archivo = archivo
    }

    
    save(objeto){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        let nuevoId = Object.keys(dataObj).length + 1

        objeto.id = nuevoId
        dataObj.push(objeto)
        fs.writeFileSync(this.archivo,JSON.stringify(dataObj,null,2))
        console.log(`El id asignado fue: ${nuevoId}`)
    }

    getById(idBuscado){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        for(let i in dataObj){
            if(dataObj[i].id === idBuscado)
                console.log(dataObj[i])
        }
        if(idBuscado > Object.keys(dataObj).length){
            console.log("Elemento no encontrado");
        }
    }

    getAll(){
        let objetosEnArchivo = []
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        for(let i in dataObj){
            objetosEnArchivo.push(dataObj[i])
        }
        console.log(objetosEnArchivo)
    }

    deleteById(idAEliminar){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        for(let i in dataObj){
            if(dataObj[i].id === idAEliminar)
                dataObj.splice(i, 1)
        }
        fs.writeFileSync(this.archivo,JSON.stringify(dataObj,null,2))
    }

    deleteAll(){
        let data = fs.readFileSync(this.archivo,'utf-8')
        let dataObj = JSON.parse(data)
        dataObj = []
        fs.writeFileSync(this.archivo,JSON.stringify(dataObj,null,2))
    }

}

let contenedor1 = new Contenedor("./productos.txt")

//contenedor1.getById(5)
// contenedor1.deleteById(3)
// contenedor1.deleteAll()
//contenedor1.getAll()
contenedor1.save({"title": "Lápiz", "price": 200,"thumbnail":"https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-256.png"})