import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/model/entities/user.entity';

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
}
