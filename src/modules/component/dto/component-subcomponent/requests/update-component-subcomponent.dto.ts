import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateComponentSubcomponentDto {
  @ApiProperty({
    description:
      'ID of the status associated with the component-subcomponent relationship',
  })
  @IsNumber()
  readonly statusId: number;
}
