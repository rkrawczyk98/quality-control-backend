import { ApiProperty } from '@nestjs/swagger';

export class DeliveryStatusResponseDto {
  @ApiProperty({ description: 'The unique identifier of the delivery status' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the delivery status' })
  readonly name: string;

  @ApiProperty({
    description: 'The date and time when the delivery status was created',
  })
  readonly creationDate: Date;

  @ApiProperty({
    description: 'The date and time when the delivery status was last modified',
  })
  readonly lastModified: Date;

  @ApiProperty({
    description: 'The date and time when the delivery status was deleted',
    required: false,
  })
  readonly deletedAt?: Date;
}
