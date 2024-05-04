import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({ description: 'The unique identifier of the permission.' })
  id: number;

  @ApiProperty({ description: 'The name of the permission.' })
  name: string;

  @ApiProperty({ description: 'The date and time when the permission was created.', type: 'string', format: 'date-time' })
  creationDate: Date;

  @ApiProperty({ description: 'The date and time of the last modification to the permission.', type: 'string', format: 'date-time' })
  lastModified: Date;

  @ApiProperty({ description: 'Indicates whether the permission is deleted.', type: 'boolean' })
  isDeleted: Boolean;
}
