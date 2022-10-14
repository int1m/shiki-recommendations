import {
  Prop, raw, Schema, SchemaFactory,
} from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

import { Images } from '@/@types';
import { Timestamps } from '@/@types/mongoose';

import { UserRate } from '../@types/users.types';

export type UserDocument = User & Document<ObjectId> & Timestamps;

@Schema({ timestamps: true })
class User {
  @Prop({ required: true })
    externalId: number;

  @Prop({ required: true })
    url: string;

  @Prop({ required: true })
    nickname: string;

  @Prop({ required: true })
    avatar: string;

  @Prop(raw({
    original: { type: String },
    preview: { type: String },
    x48: { type: String },
    x96: { type: String },
  }))
    images: Images;

  @Prop()
    lastOnlineAt?: Date;

  @Prop(raw([{
    externalId: { type: Number, required: true },
    episodes: { type: Number, required: true },
    rewatches: { type: Number, required: true },
    score: { type: Number, required: true },
    status: { type: String, required: true },
    animeExternalId: { type: Number, required: true },
    createAt: { type: Date },
    updateAt: { type: Date },
  }]))
    rates: Array<UserRate>;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('anime', {
  ref: 'Anime',
  localField: 'rates.animeId',
  foreignField: 'externalId',
  justOne: true,
});

export {
  User,
  UserSchema,
};
