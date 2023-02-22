export default class ProductsDTO {
  constructor({ title, description, value }) {
    this.title = title;
    this.description = description;
    this.value = value;
  }
}

export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductsDTO(p));
  else return new ProductsDTO(prods);
}
