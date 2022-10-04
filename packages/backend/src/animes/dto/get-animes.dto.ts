import {
  IsInt, Max, Min,
} from 'class-validator';

export class GetAnimesDto {
  @IsInt()
  @Min(1)
  @Max(40)
    count: number;

  @IsInt()
  @Min(0)
    page: number;
}
