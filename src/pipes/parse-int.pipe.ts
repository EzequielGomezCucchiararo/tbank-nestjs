import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new ValidationException();
    }
    return val;
  }
}
