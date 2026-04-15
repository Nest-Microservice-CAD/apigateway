import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus, OrderStatusEnum } from './enum/order.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusEnum, {
    message: `valid status are ${OrderStatusEnum.join(' | ')}`,
  })
  status: OrderStatus;
}
