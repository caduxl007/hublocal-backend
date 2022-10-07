import { forwardRef, Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './model/entities/ticket.entity';
import { AddressModule } from '../address/address.module';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [
    forwardRef(() => PlacesModule),
    TypeOrmModule.forFeature([Ticket]),
    AddressModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
