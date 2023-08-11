import { Restaurant } from './entities/restaurants.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateRestaurantInput,
  UpdateRestaurantOuput,
} from './dtos/update-restaurant.dto';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  async createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      await this.restaurants.save(
        this.restaurants.create(createRestaurantInput),
      );
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not create Restaurant',
      };
    }
  }

  async updateRestaurant({
    id,
    data,
  }: UpdateRestaurantInput): Promise<UpdateRestaurantOuput> {
    try {
      await this.restaurants.update(id, { ...data });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not update Restaurant',
      };
    }
  }
}
