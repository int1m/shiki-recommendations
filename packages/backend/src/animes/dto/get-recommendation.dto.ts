import {
  Equals,
  IsInt, IsNotEmpty,
} from 'class-validator';

export class GetRecommendationDto {
  @IsNotEmpty()
  @IsInt()
    id: number;

  @IsNotEmpty()
  @IsInt()
    user_id: number;

  @Equals('Anime')
  @IsNotEmpty()
    target_type: 'Anime';

  @IsNotEmpty()
  @IsInt()
    target_id: number;

  @Equals('completed')
  @IsNotEmpty()
    status: 'completed';

  @IsInt()
    episodes: number;

  @IsInt()
    chapters: number;

  @IsInt()
    volumes: number;

  @IsInt()
    rewatches: number;

  @IsNotEmpty()
  @IsInt()
    score: number;

  text: string;

  text_html: string;

  created_at: Date;

  updated_at: Date;
}
