import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EmployeeDto } from '../../infrastucture/dto/employee.dto';
import { Employee } from '../../domain/employee';

@Injectable()
export class EmployeeMapper {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  asyncToDomain(mapper: EmployeeDto): Promise<Employee> {
    return this.mapper.mapAsync(mapper, EmployeeDto, Employee);
  }
  asyncToDto(mapper: Employee): Promise<EmployeeDto> {
    return this.mapper.mapAsync(mapper, Employee, EmployeeDto);
  }
  asyncArrayDomain(mappers: EmployeeDto[]): Promise<Employee[]> {
    return this.mapper.mapArrayAsync(mappers, EmployeeDto, Employee);
  }
  asyncArrayDto(mappers: Employee[]): Promise<EmployeeDto[]> {
    return this.mapper.mapArrayAsync(mappers, Employee, EmployeeDto);
  }

  toDomain(mapper: EmployeeDto): Employee {
    return this.mapper.map(mapper, EmployeeDto, Employee);
  }
  toDto(mapper: Employee): EmployeeDto {
    return this.mapper.map(mapper, Employee, EmployeeDto);
  }
}
