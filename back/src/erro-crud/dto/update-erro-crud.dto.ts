import { PartialType } from '@nestjs/mapped-types';
import { CreateErroCrudDto } from './create-erro-crud.dto';

export class UpdateErroCrudDto extends PartialType(CreateErroCrudDto) {}
