/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDecs: string,
    @Body('price') prodPrice: number,
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDecs,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDecs: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProducts(prodId, prodTitle, prodDecs, prodPrice);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.removeProduct(prodId);
    return { msg: 'Product deleted' };
  }
}
