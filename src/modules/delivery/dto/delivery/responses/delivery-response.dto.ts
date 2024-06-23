import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({ description: 'The unique identifier of the customer' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the customer' })
  readonly name: string;
}

export class DelivaryStatusResponseDto {
  @ApiProperty({ description: 'The unique identifier of the status' })
  readonly id: number;

  @ApiProperty({ description: 'Name of delivery status' })
  readonly name: string;
}

export class CreatedByUserResponseDto {
  @ApiProperty({ description: 'The unique identifier of the user' })
  readonly id: number;

  @ApiProperty({ description: 'Username of the user' })
  readonly username: string;
}

export class ComponentTypeResponseDto {
  @ApiProperty({ description: 'The unique identifier of the componentType' })
  readonly id: number;

  @ApiProperty({ description: 'Name of the componentType' })
  readonly name: string;
}

export class DeliveryResponseDto {
  @ApiProperty({ description: 'The unique identifier of the delivery' })
  readonly id: number;

  @ApiProperty({ description: 'Unique delivery number' })
  readonly number: string;

  @ApiProperty({ description: 'ID and username of the user who created the delivery' })
  readonly createdByUser: CreatedByUserResponseDto;

  @ApiProperty({ description: 'ID and name of the component type' })
  readonly componentType: ComponentTypeResponseDto;

  @ApiProperty({ description: 'ID of the delivery status' })
  readonly status: DelivaryStatusResponseDto;

  @ApiProperty({
    description: 'ID of the customer associated with the delivery',
  })
  readonly customer: CustomerResponseDto;

  @ApiProperty({
    description: 'The date and time when the delivery was created',
  })
  readonly creationDate: Date;

  @ApiProperty({
    description: 'Date of the delivery',
  })
  readonly deliveryDate: Date;

  @ApiProperty({
    description: 'The date and time when the delivery was last modified',
  })
  readonly lastModified: Date;

  @ApiProperty({
    description: 'The date and time when the delivery was deleted',
    required: false,
  })
  readonly deletedAt?: Date;
}
