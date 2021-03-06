import { EntityRepository, Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

@EntityRepository(Store)
export class StoreRepository extends Repository<Store> {}
