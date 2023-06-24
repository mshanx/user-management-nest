import { IsNumber } from 'class-validator';

export class updateUserBossDto {
  @IsNumber()
  id: number;
}