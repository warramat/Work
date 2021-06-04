import { Expose } from 'class-transformer';
import { BeforeUpdate, UpdateDateColumn } from 'typeorm';
import { MyBase } from './my-base';

export class CommonDB extends MyBase {
  @Expose({ groups: ['ingredient_show', 'inventory_show'] })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
