import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  @Query((type) => String)
  helloWord() {
    return 'hello, world';
  }
}
