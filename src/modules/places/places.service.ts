import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { CompaniesService } from '../companies/companies.service';
import { TicketsService } from '../tickets/tickets.service';
import { User } from '../users/model/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,

    @Inject(forwardRef(() => TicketsService))
    private readonly ticketsService: TicketsService,

    private readonly addressService: AddressService,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
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

  async update(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
    user: User,
  ): Promise<void> {
    const place = await this.findOne(id);

    if (updatePlaceDto.emailToUser === user.email) {
      throw new BadRequestException(
        'Você não pode informar seu próprio e-mail',
      );
    }

    const toUser = await this.usersService.findOne(
      null,
      updatePlaceDto.emailToUser,
    );

    await this.ticketsService.create({
      fromUser: user,
      toUser,
      place: place,
      ...place.address,
      ...updatePlaceDto,
    });
  }

  async findOne(id: string): Promise<Place> {
    const place = await this.placesRepository.findOne({
      where: {
        id,
      },
      relations: ['address', 'responsibles', 'company'],
    });

    if (!place) {
      throw new NotFoundException('Local não encontrado');
    }

    return place;
  }

  async findAll(idCompany: string): Promise<Place[]> {
    const places = await this.placesRepository.find({
      where: {
        company: {
          id: idCompany,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['company'],
    });

    return places;
  }

  async remove(id: string): Promise<void> {
    const place = await this.findOne(id);

    try {
      await this.placesRepository.remove(place);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar deletar o local',
      );
    }
  }

  async updateName(id: string, name: string): Promise<void> {
    const place = await this.findOne(id);

    place.name = name;

    await this.placesRepository.save(place);
  }
}
