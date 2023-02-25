import { HttpException, Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../infrastucture/repositories/employee.repository';
import { EmployeeDto } from '../infrastucture/dto/employee.dto';
import { EmployeeMapper } from '../application/mapper/employee.mapper';
import {
  EXISTS_BY_DOCUMENT,
  NOT_FOUND,
} from '../application/util/error-message';
import { generateEmail } from '../application/util/generate-email';
import { SearchDto } from '../infrastucture/dto/search.dto';
import { PaginationDto } from "../infrastucture/dto/pagination.dto";

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly _employeeMapper: EmployeeMapper,
  ) {}

  async save(employeeDto: EmployeeDto): Promise<EmployeeDto> {
    let employee = this._employeeMapper.toDomain(employeeDto);
    const existsByDocumentAndTypeDocument =
      await this.employeeRepository.findByTypeDocumentAndDocument(
        employee.typeDocument,
        employee.document,
      );
    const isExists = !!(await this.employeeRepository.findByNameAndFirstSurname(
      employee.firstName,
      employee.firstSurname,
    ));
    if (existsByDocumentAndTypeDocument)
      throw new HttpException(
        EXISTS_BY_DOCUMENT.reason,
        EXISTS_BY_DOCUMENT.status,
      );
    employee = await this.employeeRepository.save(employee);
    employee.email = generateEmail(employee, isExists);
    employee.createdAt = new Date();
    this.employeeRepository.save(employee);
    return this._employeeMapper.toDto(employee);
  }

  async update(employeeDto: EmployeeDto): Promise<EmployeeDto> {
    const exists = await this.findById(employeeDto.employeeId);
    if (!!exists) {
      const employee = this._employeeMapper.toDomain(employeeDto);
      employee.email = generateEmail(employee);
      employee.updateAt = new Date();
      this.employeeRepository.save(employee);
      return this._employeeMapper.toDto(employee);
    }
    throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
  }

  async search(search: SearchDto): Promise<PaginationDto> {
    const employee = this._employeeMapper.toDomain(search.employee);
    const employees = await this._employeeMapper.asyncArrayDto(
      await this.employeeRepository.search(
        employee,
        search.limit,
        search.offset,
      ),
    );
    const numberOfPages: number = Math.round(
      (await this.employeeRepository.findCountOfEmployees()) / search.limit,
    );
    const pagination: PaginationDto = { employees, numberOfPages, ...search };
    return pagination;
  }

  async findById(employeeId: number): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.findById(employeeId);
    if (!!employee) return this._employeeMapper.toDto(employee);
    throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
  }

  async deleteById(employeeId: number): Promise<EmployeeDto> {
    const employee = await this.findById(employeeId);
    if (!!employee) {
      this.employeeRepository.deleteById(employeeId);
      return employee;
    }
    throw new HttpException(NOT_FOUND.reason, NOT_FOUND.status);
  }
}
