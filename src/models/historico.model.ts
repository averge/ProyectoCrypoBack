import {Entity, model, property} from '@loopback/repository';

@model()
export class Historico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  fecha?: string;

  @property({
    type: 'number',
  })
  precio?: number;

  @property({
    type: 'string',
  })
  exchangeId?: string;

  constructor(data?: Partial<Historico>) {
    super(data);
  }
}

export interface HistoricoRelations {
  // describe navigational properties here
}

export type HistoricoWithRelations = Historico & HistoricoRelations;
