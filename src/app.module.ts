import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './application/util/http-exception';
import { APP_FILTER } from '@nestjs/core';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './interfaces/employee.controller';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { EmployeeProfile } from './application/mapper/employee.profile';
import { EmployeeMapper } from './application/mapper/employee.mapper';
import { EmployeeRepository } from './infrastucture/repositories/employee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { features, databaseEnviroment } from './configuration/database';

const { database, port, username, password, host } = databaseEnviroment;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database,
      port,
      username,
      password,
      host,
      entities: features,
      synchronize: true,
    }),
    TypeOrmModule.forFeature(features),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeProfile,
    EmployeeMapper,
    EmployeeRepository,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
