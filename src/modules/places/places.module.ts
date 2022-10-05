import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { AddressModule } from '../address/address.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), AddressModule, CompaniesModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
