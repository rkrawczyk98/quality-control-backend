import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteRoleDto {
    @ApiProperty({ description: 'The unique identifier of the role to be deleted.' })
    @IsInt()
    id: number;
}
