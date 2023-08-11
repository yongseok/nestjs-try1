import { Restaurant } from './entities/restaurants.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restauranats: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restauranats.find();
  }
}
