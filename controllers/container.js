import fs from 'fs';
import { products } from './controllerProducts.js';


export default class Container {
    constructor(fileName) {
        this.fileName = fileName;
        this.objects = this.readData();
    }
    //Genera ID
    generateId() {
        try {
            if (this.objects.length === 0) return 1;
            return this.objects[this.objects.length - 1].id + 1;
        } catch (err) {
            console.log(err);
        }
    }
    //Guarda producto
    async save(obj) {
        try {
            obj.id = await this.generateId();
            obj.timestamp = Date.now();
            this.objects.push(obj);
            this.writeData();
            return obj.id;
        } catch (err) {
            console.log(err);
        }
    }
    //Devuelve producto con el ID buscado
    getById(id) {
        try {
            const obj = this.objects.find(el => el.id === id);
            return obj ? obj : null;
        } catch (err) {
            console.log(err);
        }
    }
    //Devuelve todos los productos
    getAll() {
        try {
            return this.objects;
        } catch {
            return [];
        }
    }
    //Elimina producto con el ID buscado
    deleteById(id) {
        try {
            let indexObj = this.objects.findIndex(obj => obj.id === id);
            if (indexObj === -1) return indexObj;
            this.objects.splice(indexObj, 1);
            this.writeData();
        } catch (err) {
            console.log(err);
        }
    }
    //Elimina todos los productos
    async deleteAll() {
        try {
            this.objects = [];
            this.writeData();
        } catch (err) {
            console.log(err);
        }
    }
    readData() {
        try {
            return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        } catch (error) {
            console.log(error);
            if (error.message.includes('no such file or directory')) return [];
        }
    }
    async writeData() {
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.objects, null, 2));
    }
    saveProduct(idCartSelected, idProduct) {
        try {
            const cartSelected = this.getById(idCartSelected);
            if (cartSelected == null) return;
            const productSelected = products.getById(idProduct);
            if (productSelected == null) return;
            cartSelected.products.push(productSelected);
            this.writeData();
            return 'Producto agregado';
        } catch (err) {
            console.log(err);
        }
    }
    deleteProduct(idCartSelected, idProduct) {
        try {
            const cartSelected = this.getById(idCartSelected);
            if (cartSelected == null) return;
            const productToDelete = cartSelected.products.findIndex(product => product.id === idProduct);
            if (productToDelete == -1) return;
            cartSelected.products.splice(productToDelete, 1);
            this.writeData();
            return 'Producto eliminado';
        } catch (error) {
            console.log(error);
        }
    }
}


