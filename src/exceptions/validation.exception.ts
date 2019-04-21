import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError }           from 'class-validator';

export class ValidationException extends HttpException {
  public constraints: string[];

  constructor(private readonly errors: ValidationError[]) {
    super('Data Validation Error', HttpStatus.BAD_REQUEST);
    this.constraints = this.getConstraints();
  }

  getConstraints(): string[] {
    const constraints = [];

    this.errors.forEach(error => {
      constraints.push(...Object.values(error.constraints));
    });

    return constraints;
  }
}
