import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/model/entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
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
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar criar uma empresa',
      );
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
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return company;
  }
}
