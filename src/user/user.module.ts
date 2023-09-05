import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Order } from 'src/order/entities/order.entity';
import { Verification } from './entities/Verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Verification])],
  providers: [UserResolver, UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
