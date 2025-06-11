//Constructores
class Personas {
  #id;
  #fecha_c;
  #nombre;
  #usuario;
  #clave;
  #telefonos;
  #direccion;
  #persona;
  constructor() {
    this.id = "";
    this.fecha_c = "";
    this.nombre = "";
    this.usuario = "";
    this.clave = "";
    this.telefonos = [];
    this.direccion = [];
  }
  set data(_data){
    var i;
    for(i = 0; i < _data.length; i++) {
      this.id = _data[0];
      this.fecha_c = _data[1];
      this.nombre = _data[2];
      this.usuario = _data[3];
      this.clave = _data[4];
      this.telefonos = _data[5];
      this.direccion = _data[6];
    }
  }
  get data(){
    this.persona = {
      id: `${this.id}`,
      fecha_creacion: `${this.fecha_c}`,
      nombre: `${this.nombre}`,
      usuario: `${this.usuario}`,
      clave: `${this.clave}`,
      telefonos: `${this.telefonos}`,
      direccion: `${this.direccion}`
    }
    return JSON.stringify(this.persona, null, 5);
  }
}

class Productos {
  #id;
  #fecha_c;
  #nombre;
  #descripcion;
  #precio;
  #foto;
  #producto;
  constructor() {
    this.id = "";
    this.fecha_c = "";
    this.nombre = "";
    this.descripcion = "";
    this.precio = "";
    this.foto = "";
  }
  set data(_data){
    var i;
    for(i = 0; i < _data.length; i++) {
      this.id = _data[0];
      this.fecha_c = _data[1];
      this.nombre = _data[2];
      this.descripcion = _data[3];
      this.precio = _data[4];
      this.foto = _data[5];
    }
  }
  get data(){
    this.producto = {
      id: `${this.id}`,
      fecha_creacion: `${this.fecha_c}`,
      nombre: `${this.nombre}`,
      descripcion: `${this.descripcion}`,
      precio: `${this.precio}`,
      foto: `${this.foto}`
    }
    return JSON.stringify(this.producto, null, 5);
  }
}

class Categorias {
  #id;
  #nombre;
  #descripcion;
  #categoria;
  constructor() {
    this.id = "";
    this.nombre = "";
    this.descripcion = "";
  }
  set data(_data){
    var i;
    for(i = 0; i < _data.length; i++) {
      this.id = _data[0];
      this.nombre = _data[1];
      this.descripcion = _data[2];
    }
  }
  get data(){
    this.categoria = {
      id: `${this.id}`,
      nombre: `${this.nombre}`,
      descripcion: `${this.descripcion}`
    }
    return JSON.stringify(this.categoria, null, 5);
  }
}

const persona = new Personas();
const producto = new Productos();
const categoria = new Categorias();
module.exports = { persona, producto, categoria};