import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class MyRestaurantsInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class MyRestaurantsOutput extends CoreOutput {
  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
