import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/model/entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    user: User,
  ): Promise<Company> {
    const { name, cnpj, description } = createCompanyDto;

    const company = this.companyRepository.create({
      name,
      cnpj,
      description,
      user,
    });

    try {
      return await this.companyRepository.save(company);
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('Já existe uma empresa com esse CNPJ');
      } else {
        throw new InternalServerErrorException(
          'Houve uma falha ao tentar criar uma empresa',
        );
      }
    }
  }

  async findOne(id: string, user: User): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
      relations: ['responsibles', 'places'],
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return company;
  }

  async findAll(user: User): Promise<Company[]> {
    const companies = await this.companyRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['places', 'responsibles'],
    });

    return companies;
  }

  async remove(id: string, user: User): Promise<void> {
    const company = await this.findOne(id, user);

    try {
      await this.companyRepository.remove(company);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar deletar a empresa',
      );
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: User) {
    let company = await this.findOne(id, user);

    company = Object.assign(company, {
      ...company,
      ...updateCompanyDto,
    });

    try {
      return await this.companyRepository.save(company);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao atualizar a empresa',
      );
    }
  }
}
