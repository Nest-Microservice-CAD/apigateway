import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsClient: ClientProxy,
  ) {}

  @Post('create')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send('create_product', createProductDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get('find-all')
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send('find_all_products', paginationDto).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }
  @Get('find-one/:id')
  findOneProduct(@Param('id') id: string) {
    return this.natsClient.send('find_product', { id: id }).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Patch('update/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductDto,
  ) {
    return this.natsClient
      .send('update_product', { id, ...updateProductoDto })
      .pipe(
        catchError((err) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new RpcException(err);
        }),
      );
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send('delete_product', { id }).pipe(
      catchError((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }
}
