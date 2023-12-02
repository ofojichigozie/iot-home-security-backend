import { IsNotEmpty, MinLength, IsNumberString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MinLength(11)
  phoneNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6)
  PIN: string;
}
