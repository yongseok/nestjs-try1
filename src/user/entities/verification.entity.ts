import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { v4 as uuidv4 } from 'uuid';
import { Field } from '@nestjs/graphql';

@Entity()
export class Verification extends CoreEntity {
  @Column()
  code: string;

  @ManyToOne((type) => User, (user) => user.verified, { onDelete: 'CASCADE' })
  user: User;

  @BeforeInsert()
  generateCode() {
    this.code = uuidv4();
  }
}
