import {
  IsInt, IsNotEmpty, IsString, Max, Min,
} from 'class-validator';

export class FindAnimesDto {
  @IsString()
  @IsNotEmpty()
  @Min(1)
  @Max(40)
    search: string;

  @IsInt()
  @Min(1)
  @Max(40)
    count: number;

  @IsInt()
  @Min(0)
    page: number;
}
