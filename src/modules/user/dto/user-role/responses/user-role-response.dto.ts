import { ApiProperty } from '@nestjs/swagger';

export class UserRoleResponseDto {
    @ApiProperty({ description: 'The unique identifier of the user role.' })
    id: number;

    @ApiProperty({ description: 'The unique identifier of the user associated with this role.' })
    userId: number;

    @ApiProperty({ description: 'The unique identifier of the role associated with this user.' })
    roleId: number;

    @ApiProperty({ description: 'The date and time the user role was created.', type: 'string', format: 'date-time' })
    creationDate: Date;

    @ApiProperty({ description: 'The date and time the user role was last modified.', type: 'string', format: 'date-time' })
    lastModified: Date;

    @ApiProperty({ description: 'The date and time the user role was deleted, if it was deleted.', nullable: true })
    deletedAt?: Date;
}
