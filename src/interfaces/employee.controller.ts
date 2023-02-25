import { EmployeeService } from '../services/employee.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeDto } from '../infrastucture/dto/employee.dto';
import { BadRequest } from '../application/util/bad-request';
import { SearchDto } from '../infrastucture/dto/search.dto';
import { PaginationDto } from "../infrastucture/dto/pagination.dto";

@Controller('employees')
@ApiTags('Employees')
export class EmployeeController {
  constructor(private readonly _employee: EmployeeService) {}

  @ApiOkResponse({ type: EmployeeDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Post()
  save(@Body() employeeDto: EmployeeDto) {
    return this._employee.save(employeeDto);
  }

  @ApiOkResponse({ type: EmployeeDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Put()
  update(@Body() employeeDto: EmployeeDto) {
    return this._employee.update(employeeDto);
  }

  @ApiOkResponse({ type: PaginationDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Post('search')
  search(@Body() search: SearchDto) {
    return this._employee.search(search);
  }

  @ApiOkResponse({ type: EmployeeDto })
  @ApiBadRequestResponse({ type: BadRequest })
  @Get(':employeeId')
  findById(@Param('employeeId') employeeId: number) {
    return this._employee.findById(employeeId);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({ type: BadRequest })
  @Delete(':employeeId')
  deleteById(@Param('employeeId') employeeId: number) {
    return this._employee.deleteById(employeeId);
  }
}
