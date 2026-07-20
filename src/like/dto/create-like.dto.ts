import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateLikeDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  postId!: string;
}
