import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDto {
  @IsJWT()
  token: string;

  @IsStrongPassword({
    minLength: 10,
    minLowercase: 2,
    minNumbers: 2,
    minSymbols: 2,
    minUppercase: 2,
  })
  password: string;
}
