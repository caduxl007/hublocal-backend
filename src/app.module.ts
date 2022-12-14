import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AddressModule } from './modules/address/address.module';
import { PlacesModule } from './modules/places/places.module';
import { ResponsiblesModule } from './modules/responsibles/responsibles.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      ssl:
        process.env.NODE_ENV != 'production'
          ? false
          : {
              rejectUnauthorized: false,
            },
      logging: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      dropSchema: false,
      entities: [`${__dirname}/src/**/**.entity{.ts,.js}`],
      migrations: [`${__dirname}/src/migrations/**/*{.ts,.js}`],
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    AddressModule,
    PlacesModule,
    ResponsiblesModule,
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
