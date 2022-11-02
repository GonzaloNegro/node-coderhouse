class Product {
    constructor(id, title, value, thumbnail) {
      this.id = id || null;
      this.title = title || null;
      this.value = value || null;
      this.thumbnail = thumbnail || null;
    }
  
    saveProduct(body, prodcutArray) {
      try {
        let id = 1;
        if (prodcutArray.length) {
          id = prodcutArray[prodcutArray.length - 1].id + 1;
        }
  
        const newProdcut = {
          id: id,
          title: body.title,
          value: body.value,
          thumbnail: body.thumbnail,
        };
  
        prodcutArray.push(newProdcut);
      } catch (error) {
        throw new Error("Problems during product saving!", error);
      }
    }
  }
  
  const productObj = new Product();
  
  const productArray = [
    new Product(
      1,
      "Bicicleta",
      100,
      "https://img.freepik.com/premium-psd/3d-bicycle-isolated_92267-213.jpg?w=900"
    ),
    new Product(
      2,
      "Tractor",
      1200,
      "https://img.freepik.com/free-vector/yellow-onstruction-car-isolated-white-background_1308-54935.jpg?w=1380&t=st=1667427758~exp=1667428358~hmac=c49813ef91ec77b1218a5632fa0328de9d9b5b736ee66836078a357e6477af4a"
    ),
    new Product(
      3,
      "Camion",
      300,
      "https://img.freepik.com/premium-vector/box-truck-cargo-transportation_648968-33.jpg?w=826"
    ),
  ];
  
  module.exports = {
    productObj,
    productArray,
  };