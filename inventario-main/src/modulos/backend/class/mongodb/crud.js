function objetoVacio(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}
class crudUser {
    constructor(){
        const express = require("express");
        const router = express.Router();
        const eUser = require("../../bd/js/estructura/define.js");
        const estructura = eUser.users;
        //Consulta usuarios
        router.get('/', async (req, res) => {
            const users = await estructura.find();
            console.log(users);
            res.json(users);
        });
        //Consulta usuario
        router.get('/:id', async (req, res) => {
            var consultaUser= "";
            consultaUser = await estructura.find({"codigo": `${req.params.id}`});
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.find({"nombre": `${req.params.id}`});
            }
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.find({"apellido": `${req.params.id}`})
            }
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.find({"correo": `${req.params.id}`})
            }
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.find({"usuario": `${req.params.id}`})
            }
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.find({"nivel": `${req.params.id}`})
            }
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.find({"estatus": `${req.params.id}`})
            }
            if (objetoVacio(consultaUser) === true){
                consultaUser = await estructura.findById(req.params.id);
            }
            console.log(consultaUser);
            res.json(consultaUser);
        });
        //Guarda usuario
        router.post('/', async (req, res) => {
            const {codigo, fechaCreado, fechaVence, nombre, apellido, correo, usuario, clave, nivel, estatus} = req.body;
            const user = new estructura({codigo, fechaCreado, fechaVence, nombre, apellido, correo, usuario, clave, nivel, estatus});
            console.log(user);
            await user.save();
            res.json({status: 'Usuario guardado'});
        });
        //Actualiza usuario
        router.put('/:id', async (req, res) => {
            const {codigo, fechaCreado, fechaVence, nombre, apellido, correo, usuario, clave, nivel, estatus} = req.body;
            const updateUser = {codigo, fechaCreado, fechaVence, nombre, apellido, correo, usuario, clave, nivel, estatus};
            await estructura.findByIdAndUpdate(req.params.id, updateUser);
            console.log(req.params.id);
            console.log(updateUser);
            res.json({status: 'Usuario actualizado'});
        });
        //Elimina usuario
        router.delete('/:id', async (req, res) => {
            await estructura.findByIdAndRemove(req.params.id);
            console.log(req.params.id);
            res.json({status: 'Usuario eliminado'});
        });
        return router;
    }
}

class crudProducts {
    constructor(){
        const express = require("express");
        const router = express.Router();
        const eProducts = require("../../bd/js/estructura/define.js");
        const estructura = eProducts.products;
        //Consulta productos
        router.get('/', async (req, res) => {
            const products = await estructura.find();
            console.log(products);
            res.json(products);
        });
        //Consulta producto
        router.get('/:id', async (req, res) => {
            var consultaProducto = "";
            consultaProducto = await estructura.find({"codigo": `${req.params.id}`});
            if (objetoVacio(consultaProducto) === true){
                consultaProducto = await estructura.find({"usuario": `${req.params.id}`});
            }
            if (objetoVacio(consultaProducto) === true){
                consultaProducto = await estructura.find({"nombre": `${req.params.id}`});
            }
            if (objetoVacio(consultaProducto) === true){
                consultaProducto = await estructura.find({"precio": `${req.params.id}`});
            }
            if (objetoVacio(consultaProducto) === true){
                consultaProducto = await estructura.find({"categorias": `${req.params.id}`});
            }
            if (objetoVacio(consultaProducto) === true){
                consultaProducto = await estructura.findById(req.params.id);
            }
            console.log(consultaProducto);
            res.json(consultaProducto);
        });
        //Guarda producto
        router.post('/', async (req, res) => {
            const {codigo, usuario, fechaCreado, nombre, descripcion, precio, foto, categorias} = req.body;
            const product = new estructura({codigo, usuario, fechaCreado, nombre, descripcion, precio, foto, categorias});
            console.log(product);
            await product.save();
            res.json({status: 'Producto guardado'});
        });
        //Actualiza producto
        router.put('/:id', async (req, res) => {
            const {codigo, usuario, fechaCreado, nombre, descripcion, precio, foto, categorias} = req.body;
            const updateProducts = {codigo, usuario, fechaCreado, nombre, descripcion, precio, foto, categorias};
            await estructura.findByIdAndUpdate(req.params.id, updateProducts);
            console.log(req.params.id);
            console.log(updateProducts);
            res.json({status: 'Producto actualizado'});
        });
        //Elimina producto
        router.delete('/:id', async (req, res) => {
            await estructura.findByIdAndRemove(req.params.id);
            console.log(req.params.id);
            res.json({status: 'Producto eliminado'});
        });
        return router;
    }
}

class crudCategories {
    constructor(){
        const express = require("express");
        const router = express.Router();
        const eCategories = require("../../bd/js/estructura/define.js");
        const estructura = eCategories.categories;
        //Consulta categorias
        router.get('/', async (req, res) => {
            const categories = await estructura.find();
            console.log(categories);
            res.json(categories);
        });
        //Consulta categoria
        router.get('/:id', async (req, res) => {
            var consultaCategory = "";
            consultaCategory = await estructura.find({"codigo": `${req.params.id}`});
            if (objetoVacio(consultaCategory) === true){
                consultaCategory = await estructura.find({"nombre": `${req.params.id}`});
            }
            if (objetoVacio(consultaCategory) === true){
                consultaCategory = await estructura.findById(req.params.id);
            }
            console.log(consultaCategory);
            res.json(consultaCategory);
        });
        //Guarda categoria
        router.post('/', async (req, res) => {
            const {codigo, nombre} = req.body;
            const category = new estructura({codigo, nombre});
            console.log(category);
            await category.save();
            res.json({status: 'Categoria guardada'});
        });
        //Actualiza categoria
        router.put('/:id', async (req, res) => {
            const {codigo, nombre} = req.body;
            const updateCategory = {codigo, nombre};
            await estructura.findByIdAndUpdate(req.params.id, updateCategory);
            console.log(req.params.id);
            console.log(updateCategory);
            res.json({status: 'Categoria actualizada'});
        });
        //Elimina estatu
        router.delete('/:id', async (req, res) => {
            await estructura.findByIdAndRemove(req.params.id);
            console.log(req.params.id);
            res.json({status: 'Categoria eliminada'});
        });
        return router;
    }
}

class crudEstatus {
    constructor(){
        const express = require("express");
        const router = express.Router();
        const eStatus = require("../../bd/js/estructura/define.js");
        const estructura = eStatus.status;
        //Consulta estatus
        router.get('/', async (req, res) => {
            const estatus = await estructura.find();
            console.log(estatus);
            res.json(estatus);
        });
        //Consulta estatu
        router.get('/:id', async (req, res) => {
            var consultaStatus = "";
            consultaStatus = await estructura.find({"codigo": `${req.params.id}`});
            if (objetoVacio(consultaStatus) === true){
                consultaStatus = await estructura.find({"nombre": `${req.params.id}`});
            }
            if (objetoVacio(consultaStatus) === true){
                consultaStatus = await estructura.findById(req.params.id);
            }
            console.log(consultaStatus);
            res.json(consultaStatus);
        });
        //Guarda estatu
        router.post('/', async (req, res) => {
            const {codigo, nombre} = req.body;
            const estatuto = new estructura({codigo, nombre});
            console.log(estatuto);
            await estatuto.save();
            res.json({status: 'Status guardado'});
        });
        //Actualiza estatu
        router.put('/:id', async (req, res) => {
            const {codigo, nombre} = req.body;
            const updateStatus = {codigo, nombre};
            await estructura.findByIdAndUpdate(req.params.id, updateStatus);
            console.log(req.params.id);
            console.log(updateStatus);
            res.json({status: 'Status actualizado'});
        });
        //Elimina estatu
        router.delete('/:id', async (req, res) => {
            await estructura.findByIdAndRemove(req.params.id);
            console.log(req.params.id);
            res.json({status: 'Status eliminado'});
        });
        return router;
    }
}

class crudNiveles {
    constructor(){
        const express = require("express");
        const router = express.Router();
        const eLevels = require("../../bd/js/estructura/define.js");
        const estructura = eLevels.levels;
        //Consulta niveles
        router.get('/', async (req, res) => {
            const elevels = await estructura.find();
            console.log(elevels);
            res.json(elevels);
        });
        //Consulta nivel
        router.get('/:id', async (req, res) => {
            var consultaLevel = "";
            consultaLevel = await estructura.find({"codigo": `${req.params.id}`});
            if (objetoVacio(consultaLevel) === true){
                consultaLevel = await estructura.find({"nombre": `${req.params.id}`});
            }
            if (objetoVacio(consultaLevel) === true){
                consultaLevel = await estructura.findById(req.params.id);
            }
            console.log(consultaLevel);
            res.json(consultaLevel);
        });
        //Guarda nivel
        router.post('/', async (req, res) => {
            const {codigo, nombre} = req.body;
            const elevel = new estructura({codigo, nombre});
            console.log(elevel);
            await elevel.save();
            res.json({status: 'Nivel guardado'});
        });
        //Actualiza nivel
        router.put('/:id', async (req, res) => {
            const {codigo, nombre} = req.body;
            const updateLevel = {codigo, nombre};
            await estructura.findByIdAndUpdate(req.params.id, updateLevel);
            console.log(req.params.id);
            console.log(updateLevel);
            res.json({status: 'Nivel actualizado'});
        });
        //Elimina nivel
        router.delete('/:id', async (req, res) => {
            await estructura.findByIdAndRemove(req.params.id);
            console.log(req.params.id);
            res.json({status: 'Nivel eliminado'});
        });
        return router;
    }
}

const rUser = new crudUser();
const rStatus = new crudEstatus();
const rLevels = new crudNiveles();
const rProducts = new crudProducts();
const rCategories = new crudCategories();
module.exports = {rUser, rStatus, rLevels, rProducts, rCategories};