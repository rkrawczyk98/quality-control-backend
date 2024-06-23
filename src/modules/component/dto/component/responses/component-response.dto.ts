import { ApiProperty } from '@nestjs/swagger';
import { ComponentStatus, ComponentType } from '../../../entities';
import { Delivery } from '../../../../delivery/entities';
import { Warehouse, WarehousePosition } from '../../../../warehouse/entities';

export class UserDto {
  @ApiProperty({ description: 'The unique identifier of the user' })
  readonly id: number;

  @ApiProperty({ description: 'Username of the user' })
  readonly username: string;
}

export class ComponentSubcomponentResponseDto {
  @ApiProperty({
    description:
      'The unique identifier of the component-subcomponent relationship',
  })
  readonly id: number;

  @ApiProperty({
    description: 'User who modified the component-subcomponent relationship',
    type: UserDto,
  })
  readonly modifiedByUser: UserDto;

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

export class ComponentResponseDto {
  @ApiProperty({ description: 'The unique identifier of the component' })
  readonly id: number;

  @ApiProperty({ description: 'Unique name of the component' })
  readonly name: string;

  @ApiProperty({
    description: 'User who created the component-subcomponent relationship',
    type: UserDto,
  })
  readonly createdByUser: UserDto;

  @ApiProperty({
    description: 'User who modified the component-subcomponent relationship',
    type: UserDto,
  })
  readonly modifiedByUser: UserDto;

  @ApiProperty({ description: 'ID of the component type' })
  readonly componentType: ComponentType;

  @ApiProperty({ description: 'ID of the component status' })
  readonly status: ComponentStatus;

  @ApiProperty({
    description: 'ID of the delivery associated with the component',
  })
  readonly delivery: Delivery;

  @ApiProperty({
    description: 'ID of the warehouse where the component is stored',
  })
  readonly warehouse: Warehouse;

  @ApiProperty({
    description: 'ID of the warehouse position where the component is stored',
  })
  readonly warehousePosition: WarehousePosition;

  @ApiProperty({ description: 'Date and time when the component was scrapped' })
  readonly scrappedAt: Date;

  @ApiProperty({
    description: 'The date and time when the component was created',
  })
  readonly creationDate: Date;

  @ApiProperty({
    description: 'The date and time when the component was last modified',
  })
  readonly lastModified: Date;

  @ApiProperty({
    description: 'The date and time when the component was deleted',
    required: false,
  })
  readonly deletedAt?: Date;

  @ApiProperty({ description: 'Size of the component', required: true })
  readonly size: number;

  @ApiProperty({
    description: 'The date and time when the component was controlled',
    required: false,
  })
  readonly controlDate?: Date;

  @ApiProperty({
    description: 'The date and time when the component was produced',
    required: false,
  })
  readonly productionDate?: Date;

  @ApiProperty({ type: [ComponentSubcomponentResponseDto] }) // Użyj odpowiedniej klasy DTO dla subkomponentu
  componentSubcomponents: ComponentSubcomponentResponseDto[];
}
