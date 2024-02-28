import { Expose } from "class-transformer";

export class LoginInput {
  @Expose()
  password!: string;
  @Expose()
  phone!: string;
}

export class CreateUserInput {
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  password!: string;
  @Expose()
  phone!: string;
  @Expose()
  address!: string;
}

export class UpdateUserInput {
  @Expose()
  name?: string;
  @Expose()
  email?: string;
  @Expose()
  password?: string;
  @Expose()
  phone?: string;
  @Expose()
  address?: string;
}

export class UserLoginResponse {
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  token_type!: string;
  @Expose()
  access_token!: string;
  @Expose()
  phone!: string;
  @Expose()
  address!: string;
}

export class UserResponse {
  @Expose()
  name!: string;
  @Expose()
  email!: string;
  @Expose()
  phone!: string;
  @Expose()
  address!: string;
}
