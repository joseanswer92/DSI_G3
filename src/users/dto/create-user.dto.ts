import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 1, description: 'ID del tenant' })
  @IsInt()
  @Min(1)
  tenantId: number;
}