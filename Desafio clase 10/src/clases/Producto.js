class Producto {
    constructor(id, titulo, precio, miniatura) {
      this.id = id || null;
      this.titulo = titulo || null;
      this.precio = precio || null;
      this.miniatura = miniatura || null;
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
  }
  
  module.exports = Producto;