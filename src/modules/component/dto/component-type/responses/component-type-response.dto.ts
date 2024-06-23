import { ApiProperty } from '@nestjs/swagger';

export class ComponentTypeResponseDto {
  @ApiProperty({ description: 'The unique identifier of the component type' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the component type' })
  readonly name: string;

  @ApiProperty({ description: 'The date and time when the component type was created' })
  readonly creationDate: Date;

  @ApiProperty({ description: 'The date and time when the component type was last modified' })
  readonly lastModified: Date;

  @ApiProperty({ description: 'The date and time when the component type was deleted', required: false })
  readonly deletedAt?: Date;
}
