import { ApiProperty } from '@nestjs/swagger';

export class SubcomponentResponseDto {
  @ApiProperty({ description: 'The unique identifier of the subcomponent' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the subcomponent' })
  readonly name: string;

  @ApiProperty({
    description: 'ID of the component type associated with the subcomponent',
  })
  readonly componentTypeId: number;

  @ApiProperty({
    description:
      'Flag on the subcomponent indicating whether it is an ISS or not',
  })
  readonly isISS: boolean;

  @ApiProperty({
    description: 'The date and time when the subcomponent was created',
  })
  readonly creationDate: Date;

  @ApiProperty({
    description: 'The date and time when the subcomponent was last modified',
  })
  readonly lastModified: Date;

  @ApiProperty({
    description: 'The date and time when the subcomponent was deleted',
    required: false,
  })
  readonly deletedAt?: Date;

  @ApiProperty({
    description:
      'Is a flag that determines if this subcomponent is activity or just a casual component',
  })
  readonly isActivity: boolean;
}
