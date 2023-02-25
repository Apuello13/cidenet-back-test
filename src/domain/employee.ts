import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Country } from '../application/util/country';
import { TypeDocument } from '../application/util/type-document';
import { LengthField } from '../application/util/length-field';
import { Status } from "../application/util/status";

@Entity('employees')
export class Employee {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column({ name: 'first_name', length: LengthField.DEFAULT_LENGTH })
  firstName: string;
  @AutoMap()
  @Column({ name: 'other_name', length: LengthField.OTHER_NAME_LENGTH })
  otherName: string;
  @AutoMap()
  @Column({ name: 'first_surname', length: LengthField.DEFAULT_LENGTH })
  firstSurname: string;
  @AutoMap()
  @Column({ name: 'second_surname', length: LengthField.DEFAULT_LENGTH })
  secondSurname: string;
  @AutoMap()
  @Column({ name: 'country_job', type: 'enum', enum: Country })
  countryJob: Country;
  @AutoMap()
  @Column({ name: 'type_document', type: 'enum', enum: TypeDocument })
  typeDocument: TypeDocument;
  @AutoMap()
  @Column({ length: LengthField.DEFAULT_LENGTH })
  document: string;
  @AutoMap()
  @Column({ length: LengthField.EMAIL_LENGTH })
  email: string;
  @AutoMap()
  @Column({ name: 'job_area', length: 2 })
  jobArea: string;
  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;
  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updateAt: Date;
  @AutoMap()
  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;
}
