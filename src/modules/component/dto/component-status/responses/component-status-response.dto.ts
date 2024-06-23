import { ApiProperty } from '@nestjs/swagger';

export class ComponentStatusResponseDto {
  @ApiProperty({ description: 'The unique identifier of the component status' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the component status' })
  readonly name: string;

  @ApiProperty({ description: 'Flag checking whether the component status allows setting an external number' })
  readonly isCountedForShipping: boolean;

  @ApiProperty({ description: 'The date and time when the component status was created' })
  readonly creationDate: Date;

  @ApiProperty({ description: 'The date and time when the component status was last modified' })
  readonly lastModified: Date;

  @ApiProperty({ description: 'The date and time when the component status was deleted', required: false })
  readonly deletedAt?: Date;
}
