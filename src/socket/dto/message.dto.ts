import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class MessageDto {
  @IsString()
  type: 'text';

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class MessageObjectDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @ValidateNested()
  message: MessageDto;
}
