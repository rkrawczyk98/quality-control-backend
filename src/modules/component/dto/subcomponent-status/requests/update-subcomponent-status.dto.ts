import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubcomponentStatusDto {
  @ApiProperty({ description: 'New name of the subcomponent status', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
