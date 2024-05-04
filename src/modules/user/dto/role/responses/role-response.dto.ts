import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
    @ApiProperty({ description: 'The unique identifier of the role.' })
    id: number;

    @ApiProperty({ description: 'The name of the role.' })
    name: string;

    @ApiProperty({ description: 'The date and time the role was created.', type: 'string', format: 'date-time' })
    creationDate: Date;

    @ApiProperty({ description: 'The date and time the role was last modified.', type: 'string', format: 'date-time' })
    lastModified: Date;

    @ApiProperty({ description: 'Indicates whether the role is deleted.' })
    isDeleted: Boolean;
}
