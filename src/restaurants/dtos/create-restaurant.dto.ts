import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantsInput {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  coverImg: string;

  @Field((type) => String)
  address: string;
}

@ObjectType()
export class CreateRestaurantsOutput {
  @Field((typep) => Boolean)
  ok: boolean;

  @Field((type) => String)
  error: string;
}
