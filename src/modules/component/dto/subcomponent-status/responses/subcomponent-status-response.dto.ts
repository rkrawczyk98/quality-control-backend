import { ApiProperty } from '@nestjs/swagger';

export class SubcomponentStatusResponseDto {
  @ApiProperty({ description: 'The unique identifier of the subcomponent status' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the subcomponent status' })
  readonly name: string;

  @ApiProperty({ description: 'The date and time when the subcomponent status was created' })
  readonly creationDate: Date;

  @ApiProperty({ description: 'The date and time when the subcomponent status was last modified' })
  readonly lastModified: Date;

  @ApiProperty({ description: 'The date and time when the subcomponent status was deleted', required: false })
  readonly deletedAt?: Date;
}
