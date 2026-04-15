import { IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusEnum } from './enum/order.enum';

export class UpdateOrderDto {
  @IsEnum(OrderStatusEnum, {
    message: `Order status: ${OrderStatusEnum.join(' | ')}`,
  })
  status: OrderStatus;
}
