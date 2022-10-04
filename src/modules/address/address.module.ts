import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
