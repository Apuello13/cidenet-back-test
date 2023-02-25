import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Employee } from '../../domain/employee';
import { EmployeeDto } from '../../infrastucture/dto/employee.dto';

export class EmployeeProfile extends AutomapperProfile{
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        Employee,
        EmployeeDto,
        forMember(
          (destination) => destination.employeeId,
          mapFrom((source) => source.id),
        ),
      );
      createMap(
        mapper,
        EmployeeDto,
        Employee,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.employeeId),
        ),
      );
    };
  }
}
