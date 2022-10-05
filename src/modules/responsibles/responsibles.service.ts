import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { CompaniesService } from '../companies/companies.service';
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
  ) {}

  async create(
    createResponsibleDto: CreateResponsibleDto,
    user: User,
  ): Promise<Responsible> {
    const { name, telephone, isMain, companyId } = createResponsibleDto;

    const company = await this.companiesService.findOne(companyId, user);
    const address = await this.addressService.create(createResponsibleDto);

    if (isMain) {
      await this.updateIsMain(companyId);
    }

    const responsible = this.responsiblesRepository.create({
      name,
      telephone,
      isMain,
      address,
      company,
    });

    try {
      return this.responsiblesRepository.save(responsible);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar criar um responsavel',
      );
    }
  }

  findAll() {
    return `This action returns all responsibles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} responsible`;
  }

  update(id: number, updateResponsibleDto: UpdateResponsibleDto) {
    return `This action updates a #${id} responsible`;
  }

  remove(id: number) {
    return `This action removes a #${id} responsible`;
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
