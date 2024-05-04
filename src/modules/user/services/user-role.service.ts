import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../entities/user-role.entity';
import { AddRoleToUserDto,DeleteRoleFromUserDto } from '../dto/user-role/index';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async addRoleToUser(addRoleToUserDto: AddRoleToUserDto): Promise<UserRole> {
    const newUserRole = this.userRoleRepository.create(addRoleToUserDto);
    return this.userRoleRepository.save(newUserRole);
  }

  async deleteRoleFromUser(deleteRoleFromUserDto: DeleteRoleFromUserDto): Promise<void> {
    const { userId, roleId } = deleteRoleFromUserDto;
    await this.userRoleRepository.softDelete({ userId, roleId });
  }

  async findAllRolesForUser(userId: number): Promise<UserRole[]>{
    return this.userRoleRepository.findBy({ userId })
  }
}
