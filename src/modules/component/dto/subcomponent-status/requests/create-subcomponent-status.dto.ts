import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcomponentStatusDto {
  @ApiProperty({ description: 'Unique name of the subcomponent status' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
