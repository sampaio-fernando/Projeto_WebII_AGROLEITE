import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Insumo } from '../insumo/insumo.entity';

@Entity('estoques')
export class Estoque extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantidade!: number;

  @Column({ name: 'dt_entrada', type: 'date' })
  dtEntrada!: string;

  @Column({ name: 'dt_validade', type: 'date', nullable: true })
  dtValidade?: string;

  @Column({ name: 'local_armazenado', type: 'varchar', length: 120 })
  localArmazenado!: string;

  @ManyToOne(() => Insumo)
  @JoinColumn({ name: 'insumo_id' })
  insumo!: Insumo;
}