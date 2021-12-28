import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Exchange,
  Historico,
} from '../models';
import {ExchangeRepository} from '../repositories';

export class ExchangeHistoricoController {
  constructor(
    @repository(ExchangeRepository) protected exchangeRepository: ExchangeRepository,
  ) { }

  @get('/exchanges/{id}/historicos', {
    responses: {
      '200': {
        description: 'Array of Exchange has many Historico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Historico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Historico>,
  ): Promise<Historico[]> {
    return this.exchangeRepository.historicos(id).find(filter);
  }

  @post('/exchanges/{id}/historicos', {
    responses: {
      '200': {
        description: 'Exchange model instance',
        content: {'application/json': {schema: getModelSchemaRef(Historico)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Exchange.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historico, {
            title: 'NewHistoricoInExchange',
            exclude: ['id'],
            optional: ['exchangeId']
          }),
        },
      },
    }) historico: Omit<Historico, 'id'>,
  ): Promise<Historico> {
    return this.exchangeRepository.historicos(id).create(historico);
  }

  @patch('/exchanges/{id}/historicos', {
    responses: {
      '200': {
        description: 'Exchange.Historico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historico, {partial: true}),
        },
      },
    })
    historico: Partial<Historico>,
    @param.query.object('where', getWhereSchemaFor(Historico)) where?: Where<Historico>,
  ): Promise<Count> {
    return this.exchangeRepository.historicos(id).patch(historico, where);
  }

  @del('/exchanges/{id}/historicos', {
    responses: {
      '200': {
        description: 'Exchange.Historico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Historico)) where?: Where<Historico>,
  ): Promise<Count> {
    return this.exchangeRepository.historicos(id).delete(where);
  }
}
