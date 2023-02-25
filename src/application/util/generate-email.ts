import { Employee } from '../../domain/employee';
import { regExp } from './reg-exp';
import { Country } from './country';

const DOMAIN = 'cidenet.com';
const USA_DOMAIN = 'us';
const COLOMBIAN_DOMAIN = 'co';

export const generateEmail = (
  employee: Employee,
  isExists: boolean = false,
): string => {
  let firstSurname: string = employee.firstSurname;
  if (hasWhiteSpaces(firstSurname))
    firstSurname = removeWhiteSpaces(firstSurname);
  return `${employee.firstName.toLowerCase()}.${firstSurname.toLowerCase()}${
    isExists ? `.${employee.id}` : ''
  }@${getDomain(employee.countryJob)}`;
};

const hasWhiteSpaces = (firstSurname: string): boolean =>
  regExp.WHITE_SPACES.test(firstSurname);

const removeWhiteSpaces = (firstSurname: string): string =>
  firstSurname.replace(regExp.WHITE_SPACES, '');

const getDomain = (country: string): string => {
  return `${DOMAIN}.${country === Country.USA ? USA_DOMAIN : COLOMBIAN_DOMAIN}`;
};
