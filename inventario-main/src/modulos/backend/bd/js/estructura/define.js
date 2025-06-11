const mongoose  = require ("mongoose");
const { Schema } = mongoose;

class ConectaBD {
    constructor(){
        mongoose.connect("mongodb://127.0.0.1:27017/inventario")
            .then(db => console.log("DB is conected"))
            .catch(err => console.error(err));
        return mongoose;
    }
}

class Usuarios {
    constructor(){
        const estructuraUsuario = new Schema({
            codigo:{type: String, required: true},
            fechaCreado: {type: String, required: true},
            fechaVence: {type: String, required: true},
            nombre: {type: String, required: true},
            apellido: {type: String, required: true},
            correo: {type: String, required: true},
            usuario: {type: String, required: true},
            clave:{type: String, required: true},
            nivel: {type: String, required: true},
            estatus: {type: String, required: true}
        });
        const eUser = mongoose.model('users', estructuraUsuario);
        return eUser;
    }
}

class Estatus {
    constructor(){
        const estructuraEstatus = new Schema({
            codigo:{type: String, required: true},
            nombre: {type: String, required: true}
        });
        const eStatus = mongoose.model('estatus', estructuraEstatus);
        return eStatus;
    }
}

class Niveles {
    constructor(){
        const estructuraNivel = new Schema({
            codigo:{type: String, required: true},
            nombre: {type: String, required: true}
        });
        const eLevels = mongoose.model('elevels', estructuraNivel);
        return eLevels;
    }
}

class Productos {
    constructor(){
        const estructuraProducto = new Schema({
            codigo:{type: String, required: true},
            usuario:{type: String, required: true},
            fechaCreado: {type: String, required: true},
            nombre: {type: String, require: true},
            descripcion:{type: String},
            precio: {type: String, required: true, min: 0},
            foto: {type: String},
            categorias: {type: Array}
        });
        const eProducts = mongoose.model('products', estructuraProducto);
        return eProducts;
    }
}

class Categorias {
    constructor(){
        const estructuraCategoria = new Schema({
            codigo:{type: String, required: true},
            nombre: {type: String, require: true}
        });
        const eCategories = mongoose.model('categories', estructuraCategoria);
        return eCategories;
    }
}

const bd = new ConectaBD();
const users = new Usuarios();
const status = new Estatus();
const levels = new Niveles();
const products = new Productos();
const categories = new Categorias();
module.exports = {bd, users, status, levels, products, categories};


