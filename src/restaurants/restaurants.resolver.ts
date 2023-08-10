import { Resolver, Query } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';

@Resolver()
export class RestaurantResolver {
  @Query((type) => Restaurant)
  helloWord() {
    return {
      name: 'cheese',
    };
  }
}
