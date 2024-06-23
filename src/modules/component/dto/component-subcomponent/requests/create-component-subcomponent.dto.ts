import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateComponentSubcomponentDto {
  @ApiProperty({
    description: 'ID of the component associated with the subcomponent',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly componentId: number;

  @ApiProperty({ description: 'ID of the subcomponent' })
  @IsNotEmpty()
  @IsNumber()
  readonly subcomponentId: number;

  @ApiProperty({
    description:
      'ID of the status associated with the component-subcomponent relationship',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly statusId: number;

  @ApiProperty({
    description:
      'ID of the user who modified the component-subcomponent relationship',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly modifiedByUserId: number;
}
