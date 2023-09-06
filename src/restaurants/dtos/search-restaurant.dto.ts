import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class SearchRestaurantInput {
  @Field((type) => String)
  @IsString()
  query: string;

  @Field((type) => Number, { defaultValue: 1 })
  @IsNumber()
  page: number;
}

@ObjectType()
export class SearchRestaurantOuput extends CoreOutput {
  @Field((type) => [Restaurant], { nullable: false })
  restaurants?: Restaurant[];
}
