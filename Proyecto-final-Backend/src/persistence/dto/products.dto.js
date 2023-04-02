export default class ProductsDTO {
    constructor({ name, price, description }) {
        this.name = name
        this.description = description
        this.price = price
    }
}

export function asDto(prods) {
    if (Array.isArray(prods))
        return prods.map(prod => new ProductsDTO(prod))
    else
        return new ProductsDTO(prods)
}