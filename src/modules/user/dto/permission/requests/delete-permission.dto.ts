import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeletePermissionDto {
    @ApiProperty({ description: 'Number of the permission' })
    @IsInt()
    id: number;
}