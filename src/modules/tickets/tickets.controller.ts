import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './model/dto/create-ticket.dto';
import { UpdateTicketDto } from './model/dto/update-ticket.dto';
import { GetUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/model/entities/user.entity';
import { Ticket } from './model/entities/ticket.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('tickets')
@ApiTags('Tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(@GetUser() user: User): Promise<{
    created: Ticket[];
    received: Ticket[];
  }> {
    return this.ticketsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.update(id, updateTicketDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketsService.remove(id);
  }
}
