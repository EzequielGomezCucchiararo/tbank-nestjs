/**
 * DTO (Data Transfer Object) schema for add user post request
 */
import { IsInt, IsString, Length } from 'class-validator';

export class AddUserDto {
  @IsString()
  @Length(0, 20)
  readonly name: string;

  @IsInt()
  readonly age: number;
}
