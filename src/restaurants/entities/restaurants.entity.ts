import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;
  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  coverImg: string;
  @Field((type) => String, { defaultValue: 'aaa' })
  @Column()
  @IsString()
  @IsOptional()
  address: string;
}
