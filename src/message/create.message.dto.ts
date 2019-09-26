import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateMessageDto {
  // @IsInt()
  // readonly id: number;

  @IsInt()
  readonly user_id: number;

  @IsInt()
  readonly to_user_id: number;

  @IsString()
  content: string;

  // @IsDateString()
  // readonly created_time: Date;

  @IsInt()
  readonly creator: number;

  // @IsDateString()
  // readonly updated_time: Date;

  @IsInt()
  readonly updator: number;
}
