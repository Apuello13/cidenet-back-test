import { EmployeeDto } from './employee.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ParamsSearch } from '../../application/util/params-search';

export class SearchDto implements ParamsSearch {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  offset: number;
  @ApiProperty()
  employee: EmployeeDto;
}
