import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/current-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../users/model/entities/user.entity';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Controller('companies')
@ApiTags('Empresas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get(':id')
  findOne(@GetUser() user: User, @Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id, user);
  }
}
