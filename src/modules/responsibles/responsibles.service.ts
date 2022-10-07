import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { CompaniesService } from '../companies/companies.service';
import { PlacesService } from '../places/places.service';
import { User } from '../users/model/entities/user.entity';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity';

@Injectable()
export class ResponsiblesService {
  constructor(
    @InjectRepository(Responsible)
    private readonly responsiblesRepository: Repository<Responsible>,

    private readonly addressService: AddressService,
    private readonly companiesService: CompaniesService,
    private readonly placesService: PlacesService,
  ) {}

  async create(
    createResponsibleDto: CreateResponsibleDto,
    user: User,
  ): Promise<Responsible> {
    const { name, telephone, isMain, companyId, placeId } =
      createResponsibleDto;

    if (!companyId && !placeId) {
      throw new BadRequestException(
        'Você precisa informar o ID de uma empresa ou local',
      );
    }

    if (companyId && placeId) {
      throw new BadRequestException(
        'O responsável so pode pertencer a uma empresa ou um local',
      );
    }

    const responsible = this.responsiblesRepository.create({
      name,
      telephone,
      isMain,
    });

    if (companyId) {
      const company = await this.companiesService.findOne(companyId, user);
      responsible.company = company;
    } else {
      const place = await this.placesService.findOne(placeId);
      responsible.place = place;
    }

    const address = await this.addressService.create(createResponsibleDto);
    responsible.address = address;

    if (isMain) {
      await this.updateIsMain(companyId);
    }

    try {
      return await this.responsiblesRepository.save(responsible);
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException(
          'Já existe um responsavel com esse telefone',
        );
      } else {
        throw new InternalServerErrorException(
          'Houve uma falha ao tentar criar um responsavel',
        );
      }
    }
  }

  async updateIsMain(idCompany: string): Promise<void> {
    const responsibleIsMain = await this.responsiblesRepository.findOne({
      where: {
        isMain: true,
        company: {
          id: idCompany,
        },
      },
      relations: ['company'],
    });

    if (responsibleIsMain) {
      responsibleIsMain.isMain = false;

      await this.responsiblesRepository.save(responsibleIsMain);
    }
  }
}
