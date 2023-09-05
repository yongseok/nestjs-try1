import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateAccountInput, CreateAccountOutput } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Auth/auth.guard';
import { AuthUser } from 'src/Auth/auth-user.decorator';
import { UserProfileInput, UserProfileOutput } from './dto/userProfile.dto';
import { EditProfileInput, EditProfileOutput } from './dto/edit-profile.dto';
import { VerifyEmailInput, VerifyEmailOutput } from './dto/verify-email.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  async me(@AuthUser() user: User) {
    return user;
  }

  @Query((returns) => UserProfileOutput)
  async userProFile(
    @Args('input') userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.userProfile(userProfileInput);
  }

  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @AuthUser() user: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(user, editProfileInput);
  }

  @Mutation((returns) => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') verifryEmailInput: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.userService.verifyEmail(verifryEmailInput);
  }
}
