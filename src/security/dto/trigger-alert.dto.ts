import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class TriggerAlertDto {
  @IsNotEmpty()
  UUC: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6)
  PIN: string;
}
