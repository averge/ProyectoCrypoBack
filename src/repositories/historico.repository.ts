import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BaseDataSource} from '../datasources';
import {Historico, HistoricoRelations} from '../models';

export class HistoricoRepository extends DefaultCrudRepository<
  Historico,
  typeof Historico.prototype.id,
  HistoricoRelations
> {
  constructor(
    @inject('datasources.base') dataSource: BaseDataSource,
  ) {
    super(Historico, dataSource);
  }
}
