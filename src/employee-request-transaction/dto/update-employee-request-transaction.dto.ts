import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeRequestTransactionDto } from './create-employee-request-transaction.dto';

export class UpdateEmployeeRequestTransactionDto extends PartialType(CreateEmployeeRequestTransactionDto) {}
