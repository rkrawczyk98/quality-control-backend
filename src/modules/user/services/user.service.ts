// user.service.ts
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/index';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../dto/user/index';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  // Tworzy nowego użytkownika po sprawdzeniu, czy nazwa użytkownika jest unikalna. Dodatkowo dodaje również podstawową rolę użytkownikowi - "employee"
  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { username } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException(
        `Użytkownik o nazwie ${username} już istnieje.`,
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    // Tworzenie domyślnej roli dla nowego użytkownika
    const defaultRole = new UserRole();
    defaultRole.userId = savedUser.id;
    defaultRole.roleId = 4; // Id roli - 4 odpowiada "employee"
    await this.userRoleRepository.save(defaultRole);
    return this.toResponseDto(await this.userRepository.save(newUser));
  }

  // Zwraca listę wszystkich użytkowników.
  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toResponseDto(user));
  }

  // Znajduje użytkownika na podstawie nazwy użytkownika.
  async findByUsername(username: string): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user) {
      return undefined;
    }

    return this.toResponseDto(user);
  }

  async findByUsernameAuthVersion(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  // Znajduje użytkownika na podstawie Id użytkownika.
  async findByUserId(userId: number): Promise<UserResponseDto | undefined> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!user) {
      return undefined;
    }

    return this.toResponseDto(user);
  }

  async changePassword(
    userId: number,
    changePasswordDto: UpdateUserDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(
        `Użytkownik o ID ${userId} nie został znaleziony.`,
      );
    }

    const isMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Aktualne hasło jest nieprawidłowe.');
    }

    const saltOrRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      saltOrRounds,
    );
    await this.userRepository.update(userId, { password: hashedPassword });
  }

  // Usuwa użytkownika o podanym ID.
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      creationDate: user.creationDate,
      lastModified: user.lastModified,
      isDeleted: !!user.deletedAt,
    };
  }
}
