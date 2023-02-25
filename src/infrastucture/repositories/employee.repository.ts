import { Repository } from 'typeorm';
import { Employee } from '../../domain/employee';
import { TypeDocument } from '../../application/util/type-document';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  save(employee: Employee) {
    return this.repository.save(employee);
  }

  search(employee: Employee, limit: number, offset: number) {
    return this.repository
      .createQueryBuilder('e')
      .where(
        `e.first_name = :firstName OR e.other_name = :otherName 
        OR e.first_surname = :firstSurname OR e.second_surname = :secondSurname 
        OR e.type_document = :typeDocument OR e.country_job = :countryJob 
        OR e.email = :email`,
        employee,
      )
      .orderBy()
      .skip(offset)
      .take(limit)
      .getMany();
  }

  findCountOfEmployees(): Promise<number> {
    return this.repository.count();
  }

  findByNameAndFirstSurname(name: string, firstSurname: string) {
    return this.repository.findOneBy({ firstName: name, firstSurname });
  }

  findByTypeDocumentAndDocument(typeDocument: TypeDocument, document: string) {
    return this.repository.findOneBy({ typeDocument, document });
  }

  findById(employeeId: number) {
    return this.repository.findOneBy({ id: employeeId });
  }

  deleteById(employeeId: number) {
    return this.repository.delete(employeeId);
  }
}
