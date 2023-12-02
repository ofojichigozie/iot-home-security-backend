import { IsNotEmpty, IsNumberString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @MinLength(11)
  phoneNumber: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  UUC: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6)
  PIN: string;
}
