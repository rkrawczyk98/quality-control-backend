import { ApiProperty } from '@nestjs/swagger';

export class ComponentSubcomponentResponseDto {
  @ApiProperty({
    description:
      'The unique identifier of the component-subcomponent relationship',
  })
  readonly id: number;

  @ApiProperty({
    description: 'ID of the component associated with the subcomponent',
  })
  readonly componentId: number;

  @ApiProperty({ description: 'ID of the subcomponent' })
  readonly subcomponentId: number;

  @ApiProperty({
    description:
      'ID of the status associated with the component-subcomponent relationship',
  })
  readonly statusId: number;

  @ApiProperty({
    description:
      'ID of the user who modified the component-subcomponent relationship',
  })
  readonly modifiedByUserId: number;

  @ApiProperty({
    description:
      'The date and time when the component-subcomponent relationship was created',
  })
  readonly creationDate: Date;

  @ApiProperty({
    description:
      'The date and time when the component-subcomponent relationship was last modified',
  })
  readonly lastModified: Date;

  @ApiProperty({
    description:
      'The date and time when the component-subcomponent relationship was deleted',
    required: false,
  })
  readonly deletedAt?: Date;
}
