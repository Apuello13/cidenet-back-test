import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../application/util/country';
import { TypeDocument } from '../../application/util/type-document';
import { Status } from "../../application/util/status";

export class EmployeeDto {
  @AutoMap()
  @ApiProperty()
  employeeId: number;
  @AutoMap()
  @ApiProperty()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  otherName: string;
  @AutoMap()
  @ApiProperty()
  firstSurname: string;
  @AutoMap()
  @ApiProperty()
  secondSurname: string;
  @AutoMap()
  @ApiProperty({ type: 'enum', enum: Country })
  countryJob: string;
  @AutoMap()
  @ApiProperty({ type: 'enum', enum: TypeDocument })
  typeDocument: string;
  @AutoMap()
  @ApiProperty()
  document: string;
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  jobArea: string;
  @AutoMap()
  @ApiProperty({ type: 'enum', enum: Status })
  status: string;
}
