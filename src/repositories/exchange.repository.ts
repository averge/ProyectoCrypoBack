import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BaseDataSource} from '../datasources';
import {Exchange, ExchangeRelations} from '../models';

export class ExchangeRepository extends DefaultCrudRepository<
  Exchange,
  typeof Exchange.prototype.id,
  ExchangeRelations
> {
  constructor(
    @inject('datasources.base') dataSource: BaseDataSource,
  ) {
    super(Exchange, dataSource);
  }
}
