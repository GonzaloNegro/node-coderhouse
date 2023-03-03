export default class ProductsDTO {
  constructor({ id, title, description, value }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.value = value;
  }
}

export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductsDTO(p));
  else return new ProductsDTO(prods);
}
