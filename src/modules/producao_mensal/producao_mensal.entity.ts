import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producoes_mensais')
export class ProducaoMensal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'mes_referencia', type: 'varchar', length: 7 })
  mesReferencia!: string;

  @Column({ name: 'qtd_total_litros', type: 'decimal', precision: 10, scale: 2 })
  qtdTotalLitros!: number;

  @Column({ name: 'valor_litro', type: 'decimal', precision: 8, scale: 2 })
  valorLitro!: number;

  @Column({ name: 'valor_total', type: 'decimal', precision: 12, scale: 2, nullable: true })
  valorTotal?: number;
}