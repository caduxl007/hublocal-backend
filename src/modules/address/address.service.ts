import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { cep, city, complement, neighborhood, number, state, street } =
      createAddressDto;

    const address = this.addressRepository.create({
      cep,
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
    });

    try {
      return await this.addressRepository.save(address);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao criar um endereço',
      );
    }
  }

  async update(id: string, dto: UpdateAddressDto): Promise<void> {
    const address = await this.findOne(id);

    const updateAddress = {
      ...address,
      ...dto,
    };

    try {
      await this.addressRepository.save(updateAddress);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar atualizar o endereço',
      );
    }
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: {
        id,
      },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return address;
  }
}
