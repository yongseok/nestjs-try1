import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType')
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field((type) => User)
  @ManyToOne((type) => User, (customer) => customer, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  customer?: User;

  @Field((type) => Number)
  @RelationId((order: Order) => order.customer)
  customerId: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (driver) => driver.riders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  driver?: User;

  @Field((type) => Restaurant)
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  restaurant?: Restaurant;

  @Field((type) => [Dish])
  @ManyToMany((type) => Dish)
  @JoinTable()
  dishes: Dish[];

  @Field((type) => Float)
  @Column()
  total: number;

  @Field((type) => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}
