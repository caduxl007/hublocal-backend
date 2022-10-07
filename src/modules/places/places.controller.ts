import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/model/entities/user.entity';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('places')
@ApiTags('Locais')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(
    @GetUser() user: User,
    @Body() createPlaceDto: CreatePlaceDto,
  ): Promise<Place> {
    return this.placesService.create(createPlaceDto, user);
  }

  @Get('/company/:idCompany')
  findAll(@Param('idCompany') idCompany: string): Promise<Place[]> {
    return this.placesService.findAll(idCompany);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Place> {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateTicketDto: UpdatePlaceDto,
  ): Promise<void> {
    return this.placesService.update(id, updateTicketDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.placesService.remove(id);
  }
}
