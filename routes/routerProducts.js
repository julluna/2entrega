import express from "express";
import { getProducts, addProduct, deleteProduct } from "../controllers/controllerProducts.js";
const routerProducts = express.Router();

//Obtener productos
routerProducts.get('/:id?', (req, res) => getProducts(req, res));

//Agregar producto
routerProducts.post('/', (req, res) => addProduct(req, res));

//Borrar producto
routerProducts.delete('/:id', (req, res) => deleteProduct(req, res));

export default routerProducts;