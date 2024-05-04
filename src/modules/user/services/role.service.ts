import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role/requests/create-role.dto';
import { UpdateRoleDto } from '../dto/role/requests/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name } = createRoleDto;
    const existingRole = await this.roleRepository.findOne({ where: { name } });

    if (existingRole) {
      throw new ConflictException(`Rola o nazwie "${name}" już istnieje.`);
    }

    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOneBy({ id });

    if (!existingRole) {
      throw new NotFoundException(`Rola o ID "${id}" nie została znaleziona.`);
    }

    if (updateRoleDto.name) {
      const existingRoleWithName = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name, id: Not(id) },
      });

      if (existingRoleWithName) {
        throw new ConflictException(`Rola o nazwie "${updateRoleDto.name}" już istnieje.`);
      }
    }

    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOneBy({ id });
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.softDelete(id);
  }
}
