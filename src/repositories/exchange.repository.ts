import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BaseDataSource} from '../datasources';
import {Exchange, ExchangeRelations, Historico} from '../models';
import {HistoricoRepository} from './historico.repository';

export class ExchangeRepository extends DefaultCrudRepository<
  Exchange,
  typeof Exchange.prototype.id,
  ExchangeRelations
> {

  public readonly historicos: HasManyRepositoryFactory<Historico, typeof Exchange.prototype.id>;

  constructor(
    @inject('datasources.base') dataSource: BaseDataSource, @repository.getter('HistoricoRepository') protected historicoRepositoryGetter: Getter<HistoricoRepository>,
  ) {
    super(Exchange, dataSource);
    this.historicos = this.createHasManyRepositoryFactoryFor('historicos', historicoRepositoryGetter,);
    this.registerInclusionResolver('historicos', this.historicos.inclusionResolver);
  }
}
