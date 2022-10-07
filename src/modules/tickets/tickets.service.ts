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
import { PlacesService } from '../places/places.service';
import { User } from '../users/model/entities/user.entity';
import { CreateTicketDto } from './model/dto/create-ticket.dto';
import { UpdateTicketDto } from './model/dto/update-ticket.dto';
import { Ticket } from './model/entities/ticket.entity';
import { StatusTicketEnum } from './model/enum/status-ticket.enum';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,

    @Inject(forwardRef(() => PlacesService))
    private readonly placesService: PlacesService,

    private readonly addressService: AddressService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const {
      toUser,
      fromUser,
      place,
      cep,
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
    } = createTicketDto;

    const address = {
      id: place.address.id,
      newNameLocal: createTicketDto.name,
      cep,
      city,
      complement,
      neighborhood,
      number,
      state,
      street,
    };

    const obj = {
      toUser,
      fromUser,
      place,
      address,
    };

    let ticket = await this.verifyExistsTicketPending(place.id);

    if (!ticket) {
      ticket = this.ticketsRepository.create(obj);
    } else {
      ticket = Object.assign(ticket, {
        ...obj,
        status: StatusTicketEnum.PENDENTE,
      });
    }

    ticket.title = `${ticket.id} - ${place.name}`;

    try {
      return await this.ticketsRepository.save(ticket);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao gerar ticket de atualização',
      );
    }
  }

  async verifyExistsTicketPending(idPlace: string): Promise<Ticket> {
    const ticket = await this.ticketsRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.place', 'place')
      .where('place.id = :idPlace', { idPlace })
      .andWhere('ticket.status != :status', {
        status: StatusTicketEnum.CONCLUIDO,
      })
      .getOne();

    return ticket;
  }

  async findAll(user: User): Promise<{
    created: Ticket[];
    received: Ticket[];
  }> {
    const ticketsCreated = await this.ticketsRepository.find({
      where: {
        fromUser: {
          id: user.id,
        },
      },
      relations: ['toUser', 'place'],
    });

    const ticketsReceived = await this.ticketsRepository.find({
      where: {
        toUser: {
          id: user.id,
        },
      },
      relations: ['fromUser', 'place'],
    });

    return {
      created: ticketsCreated,
      received: ticketsReceived,
    };
  }

  async findAllReceived(user: User) {
    const tickets = await this.ticketsRepository.find({
      where: {
        toUser: {
          id: user.id,
        },
      },
    });

    return tickets;
  }

  async findOne(id: string) {
    const ticket = await this.ticketsRepository.findOne({
      where: {
        id,
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket não encontrado!');
    }

    return ticket;
  }

  async update(
    id: string,
    updateTicketDto: UpdateTicketDto,
    user: User,
  ): Promise<Ticket> {
    const { status } = updateTicketDto;

    const ticket = await this.ticketsRepository.findOne({
      where: {
        id,
        toUser: {
          id: user.id,
        },
      },
      relations: ['place'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket não encontrado!');
    }

    if (ticket.status === StatusTicketEnum.CONCLUIDO) {
      throw new BadRequestException('Ticket já está concluido');
    }

    ticket.status = status;

    try {
      if (status === StatusTicketEnum.CONCLUIDO) {
        await this.addressService.update(ticket.address.id, ticket.address);
        await this.placesService.updateName(
          ticket.place.id,
          ticket.address.newNameLocal,
        );
      }
      return await this.ticketsRepository.save(ticket);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar atualizar o ticket',
      );
    }
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);

    try {
      await this.ticketsRepository.remove(ticket);
    } catch (err) {
      throw new InternalServerErrorException(
        'Houve uma falha ao tentar deletar o ticket',
      );
    }
  }
}
