import { ApiProperty } from '@nestjs/swagger';
import { DeliveryResponseDto } from '../../../../delivery/dto/delivery/responses/delivery-response.dto';

export class CustomerResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the customer',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiProperty({
    description: 'The date and time when the customer was created',
    type: 'string',
    format: 'date-time',
  })
  readonly creationDate: Date;

  @ApiProperty({
    description: 'The date and time when the customer was last modified',
    type: 'string',
    format: 'date-time',
  })
  readonly lastModified: Date;

  @ApiProperty({
    description: 'The list of deliveries associated with the customer',
    type: [DeliveryResponseDto], // Użyj tego tylko jeśli chcesz zwrócić szczegóły dostaw
    required: false // Zależne od przypadku użycia
  })
  readonly deliveries?: DeliveryResponseDto[];
}
