//Iniciar servidor
class Servidor {
    constructor() {
      const express = require("express");
      const morgan = require("morgan");
      const path = require("path");
      const app = express();
      app.set("port", process.env.PORT || 3000);
      app.use(morgan('dev'));
      app.use(express.json());
      const crud = require("../modulos/backend/class/mongodb/crud.js");
      const users = crud.rUser;
      const levels = crud.rLevels;
      const status = crud.rStatus;
      const products = crud.rProducts;
      const categories = crud.rCategories;
      app.use('/api/users', users);
      app.use('/api/levels', levels);
      app.use('/api/status', status);
      app.use('/api/products', products);
      app.use('/api/categories', categories);
      app.use(express.static(path.join(__dirname, "public")));
      app.listen(app.get("port"), () => console.log(`server on port ${app.get("port")}`));
    }
}

const servidor = new Servidor();
