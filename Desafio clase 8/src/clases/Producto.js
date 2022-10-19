class Producto {
    constructor(id, titulo, precio, miniatura) {
      this.id = id || null;
      this.titulo = titulo || null;
      this.precio = precio || null;
      this.miniatura = miniatura || null;
    }
  
    getById(id, arrayProductos) {
      try {
        let index = arrayProductos.findIndex((producto) => producto.id === id);
        if (index < 0) {
          throw "El producto buscado no existe!";
        }
        return arrayProductos[index];
      } catch (error) {
        throw error;
      }
    }
  
    saveProduct(body, arrayProductos) {
      try {
        let id = 1;
        if (arrayProductos.length) {
          id = arrayProductos[arrayProductos.length - 1].id + 1;
        }
  
        const nuevoProdcuto = {
          id: id,
          titulo: body.titulo,
          precio: body.precio,
          miniatura: body.miniatura,
        };
  
        arrayProductos.push(nuevoProdcuto);
        return nuevoProdcuto;
      } catch (error) {
        throw new Error(
          "Hubo un problema al guardar el producto solicitado!",
          error
        );
      }
    }
  
    updateProduct(id, body, arrayProductos) {
      let flagUpdate = false;
      try {
        arrayProductos.forEach((producto) => {
          if (producto.id === id) {
            producto.titulo = body.titulo;
            producto.precio = body.precio;
            producto.miniatura = body.miniatura;
            flagUpdate = true;
          }
        });
        if (!flagUpdate) {
          throw "No existe el producto solicitado!";
        }
      } catch (error) {
        throw error;
      }
    }
  
    deleteById(arrayProductos, id) {
      try {
        const index = arrayProductos.findIndex((producto) => producto.id === id);
  
        if (index < 0) {
          throw "El producto a eliminar no existe!";
        }
        arrayProductos.splice(index, 1);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = Producto;