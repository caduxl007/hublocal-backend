import { Module } from '@nestjs/common';
import { ResponsiblesService } from './responsibles.service';
import { ResponsiblesController } from './responsibles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsible } from './entities/responsible.entity';
import { AddressModule } from '../address/address.module';
import { CompaniesModule } from '../companies/companies.module';
import { PlacesModule } from '../places/places.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Responsible]),
    AddressModule,
    CompaniesModule,
    PlacesModule,
  ],
  controllers: [ResponsiblesController],
  providers: [ResponsiblesService],
})
export class ResponsiblesModule {}
