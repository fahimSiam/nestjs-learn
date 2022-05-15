import { Injectable, NotFoundException } from "@nestjs/common";
import {Product} from './product.model';
@Injectable()
export class ProductsService {
    
    private products: Product[]= [];

    insertProduct(title: string, description:string, price: number) {
        const prodId=Math.random().toString();
        const newProduct= new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProducts(productId: string, title: string, description:string, price: number){
       /*  const product=this.findProduct(productId)[0];
        const index = this.findProduct(productId)[1] */
        const [product,index] = this.findProduct(productId);
        const updatedProduct= {...product};
        if(title){
            updatedProduct.title=title;
        }
        if(description){
            updatedProduct.description=description;
        }
        if(price){
            updatedProduct.price=price;
        }
        this.products[index]=updatedProduct;

    }

    removeProduct(productId: string){
        const [product, index]=this.findProduct(productId);
        this.products.splice(index,1);
    }

    private findProduct(id: string):[Product, number]{
        const productIndex= this.products.findIndex(prod => prod.id === id);
        const product= this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }

}