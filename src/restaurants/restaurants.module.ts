import { Module } from '@nestjs/common';
import { DishResolver, RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';
import { Dish } from './entities/dish.entity';

@Module({
  providers: [
    RestaurantResolver,
    RestaurantService,
    CategoryRepository,
    DishResolver,
  ],
  imports: [TypeOrmModule.forFeature([Restaurant, Category, Dish])],
})
export class RestaurantModule {}
