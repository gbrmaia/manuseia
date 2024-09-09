import { IsString, Length, IsInt, Min, Max, IsArray, ArrayUnique } from 'class-validator';

export class CreateErroCrudDto {
  @IsString()
  @Length(6, 6, { message: 'O código do erro deve ter exatamente 6 caracteres.' })
  errorCode: string;

  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  positiveReview: number = 0;

  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  negativeReview: number = 0;

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  positiveReviewClientCodes: string[] = [];

  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  negativeReviewClientCodes: string[] = [];

  createdAt: Date = new Date();
}
