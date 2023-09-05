import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput, CreateAccountOutput } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from 'src/jwt/jwt.service';
import { UserProfileInput, UserProfileOutput } from './dto/userProfile.dto';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { Verification } from './entities/Verification.entity';
import { VerifyEmailInput, VerifyEmailOutput } from './dto/verify-email.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({
        where: {
          email: email,
        },
      });
      if (exists) {
        return {
          ok: false,
          error: 'There is a user with that email already',
        };
      }

      this.users.save(
        this.users.create({
          email,
          password,
          role,
        }),
      );
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not create Account',
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user: User = await this.users.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: `User not found`,
        };
      }
      if (await user.checkPassword(password)) {
        const token = this.jwtService.sign(user.id);
        return {
          ok: true,
          token,
        };
      } else {
        return {
          ok: false,
          error: 'Password not match',
        };
      }
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: `Could't loging`,
      };
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return this.users.findOne({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new Error('Could not found user by id');
    }
  }

  // TODO: 사용자 조회 시 (relation: restaurants, orders, payments, riders)
  async userProfile({ email }: UserProfileInput): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }

      return {
        ok: true,
        user,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'Could not should user profile.',
      };
    }
  }

  async editProfile(
    user: User,
    editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const find_user = await this.users.findOne({
        where: { id: user.id },
      });
      if (!find_user) {
        return {
          ok: false,
          error: 'could not found user.',
        };
      }

      await this.verifications.save(
        this.verifications.create({
          user,
        }),
      );

      await this.users.save(
        this.users.create({ ...find_user, ...editProfileInput }),
      );
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'could not run editProfile.',
      };
    }
  }

  async verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    try {
      const verify = await this.verifications.findOne({ where: { code } });
      if (!verify) {
        return {
          ok: false,
          error: 'can not found verify.',
        };
      }
      await this.verifications.delete(verify.id);
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'Could not verify email.',
      };
    }
  }
}
