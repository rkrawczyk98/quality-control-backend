import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ description: 'Name of the permission' })
  @IsNotEmpty()
  name: string;
}
