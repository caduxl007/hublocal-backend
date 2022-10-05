import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { CompaniesService } from '../companies/companies.service';
import { User } from '../users/model/entities/user.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,

    private readonly addressService: AddressService,
    private readonly companiesService: CompaniesService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto, user: User): Promise<Place> {
    const { name, companyId } = createPlaceDto;

    const company = await this.companiesService.findOne(companyId, user);
    const address = await this.addressService.create(createPlaceDto);
    const place = this.placesRepository.create({
      name,
      company,
      address,
    });

    try {
      return await this.placesRepository.save(place);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao criar um local',
      );
    }
  }
}
