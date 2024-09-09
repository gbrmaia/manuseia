import { IsString, IsDate, IsIn, Length, IsDateString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  errorCode: string;

  @IsString()
  suggestion: string;

  @IsDateString()
  date: Date;

  @IsString()
  @Length(6, 6)
  clientCode: string;

  @IsString()
  @IsIn(['positive', 'negative'])
  review: string;
}
