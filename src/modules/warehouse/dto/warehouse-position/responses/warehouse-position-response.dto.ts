import { ApiProperty } from '@nestjs/swagger';

export class WarehousePositionResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly warehouseId: number;

  @ApiProperty()
  readonly creationDate: Date;

  @ApiProperty()
  readonly lastModified: Date;

  @ApiProperty()
  readonly deletedAt?: Date;
}
