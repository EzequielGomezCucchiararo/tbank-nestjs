import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    let object: object;
    let errors: ValidationError[];

    if (!metatype || !ValidationPipe.toValidate(metatype)) {
      return value;
    }

    object = plainToClass(metatype, value);
    errors = await validate(object);

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    return value;
  }

  private static toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
