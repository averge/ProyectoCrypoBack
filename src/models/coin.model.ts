import {Entity, model, property, hasMany} from '@loopback/repository';
import {Exchange} from './exchange.model';

@model()
export class Coin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  sufijo: string;

  @property({
    type: 'number',
  })
  precio?: number;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @hasMany(() => Exchange)
  exchanges: Exchange[];

  constructor(data?: Partial<Coin>) {
    super(data);
  }
}

export interface CoinRelations {
  // describe navigational properties here
}

export type CoinWithRelations = Coin & CoinRelations;
