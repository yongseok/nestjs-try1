import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Field((type) => String)
  @Column()
  name: string;
  @Field((type) => String, { nullable: true })
  @Column()
  coverImg: string;
  @Field((type) => String)
  @Column()
  address: string;
  @Field((type) => String)
  @Column()
  ownerName: string;
  @Field((type) => String)
  @Column()
  categoryName: string;
}
