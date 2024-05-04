import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ description: 'The unique identifier of the user.' })
    id: number;

    @ApiProperty({ description: 'The username of the user.' })
    username: string;

    @ApiProperty({ description: 'The date and time the user was created.', type: 'string', format: 'date-time' })
    creationDate: Date;

    @ApiProperty({ description: 'The date and time the user was last modified.', type: 'string', format: 'date-time' })
    lastModified: Date;

    @ApiProperty({ description: 'Indicates whether the user is deleted.' })
    isDeleted: Boolean;
}
