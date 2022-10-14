import {
  Schema, Prop, raw, SchemaFactory,
} from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

import { Timestamps } from '@/@types/mongoose';

import { Images } from '@/@types';
import {
  Character,
  Genre, Person, RateScoresStat, RateStatusesStat, Studio,
} from '../@types/animes.types';

export type AnimeDocument = Anime & Document<ObjectId> & Timestamps;

@Schema({ timestamps: true })
export class Anime {
  @Prop({ required: true })
    externalId: number;

  @Prop({ required: true })
    url: string;

  @Prop({ required: true })
    score: number;

  @Prop({ required: true })
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
    id: {
      type: Number,
      required: true,
    },
    name: { type: String },
    filteredName: { type: String },
    image: { type: String },
    real: { type: Boolean },
  }]))
    studios: Array<Studio>;

  @Prop(raw([{
    id: {
      type: Number,
      required: true,
    },
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

  @Prop({ required: true })
    duration: number;

  @Prop({ required: true })
    episodes: number;

  @Prop({ required: true })
    episodesAired: number;

  @Prop()
    nextEpisodeAt?: string;

  @Prop({ required: true })
    favoured: boolean;

  @Prop({ required: true })
    anons: boolean;

  @Prop({ required: true })
    ongoing: boolean;

  @Prop(raw([{
    name: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  }]))
    ratesScoresStats: Array<RateScoresStat>;

  @Prop(raw([{
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
  }]))
    ratesStatusesStats: Array<RateStatusesStat>;

  @Prop(raw([{
    externalId: {
      type: Number,
      required: true,
    },
    images: {
      original: { type: String },
      preview: { type: String },
      x48: { type: String },
      x96: { type: String },
    },
    name: {
      type: String,
      required: true,
    },
    nameRussian: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    seyus: [{
      externalId: {
        type: Number,
        required: true,
      },
      images: {
        original: { type: String },
        preview: { type: String },
        x48: { type: String },
        x96: { type: String },
      },
      name: {
        type: String,
        required: true,
      },
      nameRussian: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    }],
  }]))
    characters: Array<Character>;

  @Prop(raw([{
    externalId: {
      type: Number,
      required: true,
    },
    images: {
      original: { type: String },
      preview: { type: String },
      x48: { type: String },
      x96: { type: String },
    },
    name: {
      type: String,
      required: true,
    },
    nameRussian: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    roles: [{
      name: {
        type: String,
        required: true,
      },
      nameRussian: {
        type: String,
        required: true,
      },
    }],
  }]))
    persons: Array<Person>;
}

export const AnimeSchema = SchemaFactory.createForClass(Anime)
  .index({
    nameRussian: 'text',
    namesEnglish: 'text',
    name: 'text',
    description: 'text',
  });
