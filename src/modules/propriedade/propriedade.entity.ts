import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Propriedade } from '../propriedade/propriedade.entity';

@Entity('piquetes')
export class Propriedade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tamanho!: number;

  @Column({ name: 'endereco', type: 'varchar', length: 120 })
  endereco!: string;

//   @ManyToOne(() => Propriedade)
//   @JoinColumn({ name: 'propriedade_id' })
//   propriedade!: Propriedade;
}