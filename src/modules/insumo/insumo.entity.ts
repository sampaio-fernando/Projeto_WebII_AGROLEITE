import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('insumos')
export class Insumo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 120 })
    descricao!: string;

    @Column({ type: 'varchar', length: 50 })
    und_medida!: string;

    @Column({ type: 'varchar', length: 70 })
    categoria!: string;

    @Column({ type: 'decimal', precision: 8, scale:2 })
    valor_unit!: number;
}