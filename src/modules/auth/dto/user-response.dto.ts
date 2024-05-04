import { ApiProperty } from '@nestjs/swagger';

class UserRoleDto {
    @ApiProperty({ description: 'The unique identifier of the role.' })
    id: number;

    @ApiProperty({ description: 'The name of the role.' })
    name: string;
}

export class UserResponseDto   {
    @ApiProperty({ description: 'The unique identifier of the user.' })
    id: number;

    @ApiProperty({ description: 'The username of the user.' })
    username: string;

    @ApiProperty({
        description: 'The roles associated with the user.',
        type: [UserRoleDto],
    })
    roles: UserRoleDto[];
}