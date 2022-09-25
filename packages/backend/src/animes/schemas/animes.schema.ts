import {
  Schema, Prop, raw, SchemaFactory,
} from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

import { Timestamps } from '@/@types/mongoose';

export interface Images {
  original?: string;
  preview?: string;
  x48?: string;
  x96?: string;
}

export interface Studio {
  id: number;
  name?: string;
  filteredName?: string;
  image?: string;
  real?: boolean;
}

export interface Genre {
  id: number;
  kind?: string;
  name?: string;
  nameRussian?: string;
}

export interface RateScoresStat {
  name: number;
  value: number;
}

export interface RateStatusesStat {
  name: 'Запланировано' | 'Просмотрено' | 'Смотрю' | 'Брошено' | 'Отложено';
  value: number;
}

export type AnimeDocument = Anime & Document<ObjectId> & Timestamps;

@Schema({ timestamps: true })
export class Anime {
  @Prop({ required: true })
    externalId: number;

  @Prop({ required: true })
    url: string;

  @Prop()
    score: number;

  @Prop()
    rating: string; // возрастной рейтинг

  @Prop()
    name?: string;

  @Prop()
    nameRussian?: string;

  @Prop([String])
    namesEnglish?: Array<string>;

  @Prop([String])
    namesJapanese?: Array<string>;

  @Prop([String])
    synonyms?: Array<string>;

  @Prop()
    airedOn?: string;

  @Prop()
    releasedOn?: string;

  @Prop()
    kind?: string; // tv | ova | film ...

  @Prop()
    description?: string;

  @Prop()
    status?: string;

  @Prop()
    franchise?: string;

  @Prop(raw([{
    id: { type: Number, required: true },
    name: { type: String },
    filteredName: { type: String },
    image: { type: String },
    real: { type: Boolean },
  }]))
    studios: Array<Studio>;

  @Prop(raw([{
    id: { type: Number, required: true },
    kind: { type: String },
    name: { type: String },
    nameRussian: { type: String },
  }]))
    genres: Array<Genre>;

  @Prop(raw({
    original: { type: String },
    preview: { type: String },
    x48: { type: String },
    x96: { type: String },
  }))
    images: Images;

  @Prop()
    duration: number;

  @Prop()
    episodes: number;

  @Prop()
    episodesAired: number;

  @Prop()
    nextEpisodeAt: string;

  @Prop()
    favoured: boolean;

  @Prop()
    anons: boolean;

  @Prop()
    ongoing: boolean;

  @Prop(raw([{
    name: { type: Number, required: true },
    number: { type: Number, required: true },
  }]))
    ratesScoresStats: Array<RateScoresStat>;

  @Prop(raw([{
    name: { type: String, required: true },
    number: { type: String, required: true },
  }]))
    ratesStatusesStats: Array<RateStatusesStat>;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime);
