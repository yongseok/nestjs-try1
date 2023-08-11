import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';

@Module({
  providers: [RestaurantResolver, RestaurantService],
  imports: [TypeOrmModule.forFeature([Restaurant])],
})
export class RestaurantModule {}
