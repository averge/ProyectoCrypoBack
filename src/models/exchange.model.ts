import {Entity, model, property, hasMany} from '@loopback/repository';
import {Historico} from './historico.model';

@model()
export class Exchange extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  link?: string;

  @property({
    type: 'string',
  })
  script?: string;

  @property({
    type: 'string',
  })
  coinId?: string;

  @hasMany(() => Historico)
  historicos: Historico[];

  constructor(data?: Partial<Exchange>) {
    super(data);
  }
}

export interface ExchangeRelations {
  // describe navigational properties here
}

export type ExchangeWithRelations = Exchange & ExchangeRelations;
