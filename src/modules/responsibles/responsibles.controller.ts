import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/model/entities/user.entity';
import { Responsible } from './entities/responsible.entity';

@Controller('responsibles')
@ApiTags('Responsaveis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ResponsiblesController {
  constructor(private readonly responsiblesService: ResponsiblesService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createResponsibleDto: CreateResponsibleDto,
  ): Promise<Responsible> {
    return this.responsiblesService.create(createResponsibleDto, user);
  }
}
