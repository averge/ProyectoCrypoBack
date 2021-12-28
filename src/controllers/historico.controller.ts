import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Historico} from '../models';
import {HistoricoRepository} from '../repositories';

export class HistoricoController {
  constructor(
    @repository(HistoricoRepository)
    public historicoRepository : HistoricoRepository,
  ) {}

  @post('/historicos')
  @response(200, {
    description: 'Historico model instance',
    content: {'application/json': {schema: getModelSchemaRef(Historico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historico, {
            title: 'NewHistorico',
            exclude: ['id'],
          }),
        },
      },
    })
    historico: Omit<Historico, 'id'>,
  ): Promise<Historico> {
    return this.historicoRepository.create(historico);
  }

  @get('/historicos/count')
  @response(200, {
    description: 'Historico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Historico) where?: Where<Historico>,
  ): Promise<Count> {
    return this.historicoRepository.count(where);
  }

  @get('/historicos')
  @response(200, {
    description: 'Array of Historico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Historico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Historico) filter?: Filter<Historico>,
  ): Promise<Historico[]> {
    return this.historicoRepository.find(filter);
  }

  @patch('/historicos')
  @response(200, {
    description: 'Historico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historico, {partial: true}),
        },
      },
    })
    historico: Historico,
    @param.where(Historico) where?: Where<Historico>,
  ): Promise<Count> {
    return this.historicoRepository.updateAll(historico, where);
  }

  @get('/historicos/{id}')
  @response(200, {
    description: 'Historico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Historico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Historico, {exclude: 'where'}) filter?: FilterExcludingWhere<Historico>
  ): Promise<Historico> {
    return this.historicoRepository.findById(id, filter);
  }

  @patch('/historicos/{id}')
  @response(204, {
    description: 'Historico PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historico, {partial: true}),
        },
      },
    })
    historico: Historico,
  ): Promise<void> {
    await this.historicoRepository.updateById(id, historico);
  }

  @put('/historicos/{id}')
  @response(204, {
    description: 'Historico PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historico: Historico,
  ): Promise<void> {
    await this.historicoRepository.replaceById(id, historico);
  }

  @del('/historicos/{id}')
  @response(204, {
    description: 'Historico DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historicoRepository.deleteById(id);
  }
}
