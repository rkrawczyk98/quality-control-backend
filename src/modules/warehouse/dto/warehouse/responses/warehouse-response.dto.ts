import { ApiProperty } from '@nestjs/swagger';

export class WarehouseResponseDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly creationDate: Date;

  @ApiProperty()
  readonly lastModified: Date;

  @ApiProperty()
  readonly deletedAt?: Date;
}
