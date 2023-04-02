import { saveProduct, getAllProducts, getById, updateProd, deleteProd } from "../services/products.services.js";

export const saveController = async (req, res) => {
    const { body } = req;
    try {
        const product = await saveProduct(body);
        res.json(product);
    } catch (error) {
        res.status(404).json({ message: 'Bad Request' });
    }
}

export const getAllController = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
}

export async function getByIdController(req, res) {
    try {
        const { id } = req.params;
        const prod = await getById(id);
        if (prod) {
            res.status(200).json(prod);
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid id' });
    }
}

export async function updateProdController(req, res) {
    try {
        const { id } = req.params;
        const { name, price, stock, description } = req.body;

        const data = {
            name: name,
            price: price,
            stock: stock,
            description: description,
        }

        const prodUpdated = await updateProd( id, data)
        res.status(200).json(prodUpdated);
        
    } catch (error) {
        res.status(501).send(error.message);
    }
}

export async function deleteProdController(req, res) {
    try {
        const { id } = req.params;
        const news = await deleteProd(`${id}`);
        if (news) {
            res.status(200).json(news);
        }
    } catch (error) {
        res.status(501).send(error.message);
    }
}