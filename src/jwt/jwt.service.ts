import { Inject, Injectable } from '@nestjs/common';
import * as Jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.construct';
import { JwtModuleOptions } from './jwt.module.options';

@Injectable()
export class JwtService {
  constructor(@Inject(CONFIG_OPTIONS) private options: JwtModuleOptions) {}
  hello() {
    console.log('hello');
  }
  sign(userId: number): string {
    return Jwt.sign({ id: userId }, this.options.PrivateKey);
  }

  verify(token: string) {
    return Jwt.verify(token, this.options.PrivateKey);
  }
}
