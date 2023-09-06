import {
  InputType,
  ObjectType,
  PickType,
  PartialType,
  Field,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { IsString } from 'class-validator';

@InputType()
export class EditRestaurantInput extends PartialType(
  PickType(Restaurant, ['name', 'address', 'coverImg', 'id']),
) {
  @Field((type) => Number)
  id: number;

  @Field((type) => String, { nullable: true })
  @IsString()
  categoryName?: string;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}
