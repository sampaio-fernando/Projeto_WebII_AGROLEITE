import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('propriedades')
export class Propriedade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tamanho!: number;

  @Column({ type: 'varchar', length: 60 })
  linha!: string;

  @Column({ type: 'varchar', length: 80 })
  cidade!: string;

  @Column({ type: 'varchar', length: 2 })
  estado!: string;
}