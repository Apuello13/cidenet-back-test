import { EmployeeDto } from './employee.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ParamsSearch } from '../../application/util/params-search';

export class PaginationDto implements ParamsSearch{
  @ApiProperty({ type: () => EmployeeDto, isArray: true })
  employees: EmployeeDto[];
  @ApiProperty()
  limit: number;
  @ApiProperty()
  offset: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  numberOfPages: number;
}
