import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddPermissionToRoleDto {
    @ApiProperty({ description: 'The unique identifier of the role.' })
    @IsInt()
    roleId: number;

    @ApiProperty({ description: 'The unique identifier of the permission to be added to the role.' })
    @IsInt()
    permissionId: number;
}
