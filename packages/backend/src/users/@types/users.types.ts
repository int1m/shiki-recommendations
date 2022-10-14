export type UserRateStatus = 'planned' | 'watching' | 'rewatching' | 'completed' | 'on_hold' | 'dropped';

export interface UserRate {
  externalId: number;
  episodes: number;
  rewatches: number;
  score: number;
  status: UserRateStatus;
  animeExternalId: number;
  createdAt: Date;
  updatedAt: Date;
}
