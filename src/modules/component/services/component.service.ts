import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Component } from '../entities/component.entity';
import {
  CreateComponentDto,
  UpdateComponentDto,
  ComponentResponseDto,
} from '../dto/component';
import {
  ComponentStatus,
  ComponentSubcomponent,
  Subcomponent,
} from '../entities';
import { Delivery } from '../../delivery/entities';
import { User } from '../../../modules/user/entities';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
    @InjectRepository(ComponentStatus)
    private readonly componentStatusRepository: Repository<ComponentStatus>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(
    createComponentDto: CreateComponentDto,
    userId: number,
  ): Promise<ComponentResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Najpierw szukamu dostawy, aby upewnić się, że istnieje i pobrać jej componentTypeId
      const delivery = await queryRunner.manager.findOne(Delivery, {
        where: { id: createComponentDto.deliveryId },
      });
      if (!delivery) {
        throw new NotFoundException(
          `Delivery with ID ${createComponentDto.deliveryId} not found`,
        );
      }

      const component = queryRunner.manager.create(Component, {
        ...createComponentDto,
        createdByUserId: userId,
        modifiedByUserId: userId,
        status: { id: 1 },
        delivery: { id: createComponentDto.deliveryId },
        componentType: { id: delivery.componentTypeId },
        warehouse: { id: 1 }, //createComponentDto.warehouseId - puki co nie korzystamy w modułu magazynu
        warehousePosition: { id: 1 }, //createComponentDto.warehousePositionId
      });

      const createdComponent = await queryRunner.manager.save(component);

      // Pobieramy wszystkie subkomponenty związane z componentTypeId
      const subcomponents = await queryRunner.manager.find(Subcomponent, {
        where: { componentType: { id: delivery.componentTypeId } },
        order: {id: "ASC"},
      });

      // Dla każdego subkomponentu, utwórz ComponentSubcomponent
      const componentSubcomponents = subcomponents.map((subcomponent) => {
        return {
          component: { id: createdComponent.id },
          subcomponent: { id: subcomponent.id },
          status: { id: 1 },
          modifiedByUserId: userId,
        };
      });

      await queryRunner.manager.save(
        ComponentSubcomponent,
        componentSubcomponents,
      );
      await queryRunner.commitTransaction();

      const foundComponent = await this.componentRepository.findOne({
        where: { id: createdComponent.id },
        relations: [
          'componentType',
          'status',
          'delivery',
          'warehouse',
          'warehousePosition',
          'componentSubcomponents',
          'componentSubcomponents.status',
          'componentSubcomponents.subcomponent',
        ],
      });

      if (!foundComponent)
        throw new NotFoundException(
          `Component with ID ${createdComponent.id} not found`,
        );

      return this.componentToResponseDto(foundComponent);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to create component, ' + error,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ComponentResponseDto[]> {
    const components = await this.componentRepository.find({
      relations: [
        'componentType',
        'status',
        'delivery',
        'warehouse',
        'warehousePosition',
        'componentSubcomponents',
        'componentSubcomponents.status',
        'componentSubcomponents.subcomponent',
      ],
    });
    return await Promise.all(
      components.map(async (component) =>
        this.componentToResponseDto(component),
      ),
    );
  }

  async findOne(id: number): Promise<ComponentResponseDto> {
    const component = await this.componentRepository.findOne({
      where: { id },
      relations: [
        'componentType',
        'status',
        'delivery',
        'warehouse',
        'warehousePosition',
        'componentSubcomponents',
        'componentSubcomponents.status',
        'componentSubcomponents.subcomponent',
      ],
    });

    if (!component)
      throw new NotFoundException(`Component with ID "${id}" not found`);

    return this.componentToResponseDto(component);
  }

  async update(
    id: number,
    updateComponentDto: UpdateComponentDto,
    userId: number,
  ): Promise<ComponentResponseDto> {
    const existingComponent = await this.componentRepository.findOne({
      where: { id },
      relations: [
        'componentType',
        'status',
        'delivery',
        'warehouse',
        'warehousePosition',
        'componentSubcomponents',
        'componentSubcomponents.status',
        'componentSubcomponents.subcomponent',
      ],
    });

    if (!existingComponent) {
      throw new NotFoundException(`Component with ID "${id}" not found`);
    }

    const targetStatus = await this.componentStatusRepository.findOneBy({
      id: updateComponentDto?.statusId,
    });

    if (updateComponentDto.statusId) {
      // Jeżeli podaliśmy w metodzie update statusId, a ten nie istnieje w bazie to odbijamy z błędem
      if (!targetStatus) {
        throw new BadRequestException(
          `Component status with ID "${updateComponentDto.statusId}" does not exist.`,
        );
      }
    }

    // Sprawdzenie, czy scrappedAt jest podane dla statusu innego niż 5
    if (
      (updateComponentDto.scrappedAt && (existingComponent.status.id !== 5 && !updateComponentDto.statusId))
    ) {
      throw new BadRequestException(
        `Setting scrappedAt is only allowed when statusId is 5.`,
      );
    }

    if (updateComponentDto.statusId === 5 && !updateComponentDto.scrappedAt) {
      existingComponent.scrappedAt = new Date(); // Ustawiamy scrappedAt na aktualną datę, jeśli status zmienia się na 5
    } else if (
      existingComponent.status.id === 5 &&
      updateComponentDto.statusId !== 5
    ) {
      existingComponent.scrappedAt = null; // Ustawiamy scrappedAt na null, jeśli status zmienia się z 5 na inny
    }

    if (targetStatus) {
      Object.assign(existingComponent, updateComponentDto, {
        modifiedByUserId: userId,
        status: targetStatus,
      });
    } else {
      Object.assign(existingComponent, updateComponentDto, {
        modifiedByUserId: userId,
      });
    }

    await this.componentRepository.save(existingComponent);

    return this.componentToResponseDto(existingComponent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.componentRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Component with ID "${id}" not found`);
    }
  }

  async findAllForDelivery(deliveryId: number): Promise<Component[]> {
    return this.componentRepository.find({
      where: { delivery: { id: deliveryId } },
      relations: [
        'componentType',
        'status',
        'delivery',
        'warehouse',
        'warehousePosition',
        'componentSubcomponents',
        'componentSubcomponents.status',
        'componentSubcomponents.subcomponent',
      ],
    });
  }

  async componentToResponseDto(
    component: Component,
  ): Promise<ComponentResponseDto> {
    const createdByUserComp = await this.userRepository.findOneBy({
      id: component.createdByUserId,
    });
    const modifiedByUserComp = await this.userRepository.findOneBy({
      id: component.modifiedByUserId,
    });

    // Pobranie unikalnych ID użytkowników, którzy modyfikowali ComponentSubcomponents
    const modifiedUserIds = [
      ...new Set(
        component.componentSubcomponents.map((csc) => csc.modifiedByUserId),
      ),
    ];

    // Pobranie danych użytkowników w jednym zapytaniu
    const users = await this.userRepository.findByIds(modifiedUserIds);

    // Budowanie mapy dla szybkiego dostępu
    const usersMap = new Map(users.map((user) => [user.id, user]));

    const componentSubcomponentsDto = component.componentSubcomponents.map(
      (componentSubcomponent) => {
        const modifyingUser = usersMap.get(
          componentSubcomponent.modifiedByUserId,
        );

        return {
          creationDate: componentSubcomponent.creationDate,
          deletedAt: componentSubcomponent.deletedAt,
          id: componentSubcomponent.id,
          name: componentSubcomponent.subcomponent.name,
          lastModified: componentSubcomponent.lastModified,
          modifiedByUser: modifyingUser
            ? {
                id: modifyingUser.id,
                username: modifyingUser.username,
              }
            : null, //componentSubcomponent.modifiedByUserId,
          status: componentSubcomponent.status
            ? {
                id: componentSubcomponent.status.id,
                name: componentSubcomponent.status.name,
                creationDate: componentSubcomponent.status.creationDate,
                lastModified: componentSubcomponent.status.lastModified,
                deletedAt: componentSubcomponent.status.deletedAt,
              }
            : null,
        };
      },
    );

    return {
      id: component.id,
      name: component.name,
      createdByUser: createdByUserComp
        ? {
            id: createdByUserComp.id,
            username: createdByUserComp.username,
          }
        : null, //createdByUserId: component.createdByUserId,
      modifiedByUser: modifiedByUserComp
        ? {
            id: modifiedByUserComp.id,
            username: modifiedByUserComp.username,
          }
        : null, //modifiedByUserId: component.modifiedByUserId,
      componentType: component.componentType ? component.componentType : null,
      status: component.status ? component.status : null,
      delivery: component.delivery ? component.delivery : null,
      warehouse: component.warehouse ? component.warehouse : null,
      warehousePosition: component.warehousePosition
        ? component.warehousePosition
        : null,
      productionDate: component.productionDate,
      controlDate: component.controlDate,
      size: component.size,
      creationDate: component.creationDate,
      scrappedAt: component.scrappedAt,
      lastModified: component.lastModified,
      deletedAt: component.deletedAt,
      componentSubcomponents: componentSubcomponentsDto,
    };
  }
}
