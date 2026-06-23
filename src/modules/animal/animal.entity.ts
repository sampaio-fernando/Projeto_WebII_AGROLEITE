import { text } from "stream/consumers";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Categoria } from "../categoria/categoria.entity";
import { Propriedade } from "../propriedade/propriedade.entity";


@Entity('animais')
export class Animal extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 120})
    identificacao!: string;

    @CreateDateColumn({ name: 'data_nascimento' })
    data_nascimento!: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    peso!: number;

    @ManyToOne(() => Categoria)
    @JoinColumn({
        name: 'categoria_id'
    })
    categoria!: Categoria;

    @ManyToOne(() => Propriedade)
    @JoinColumn({
        name: 'propriedade_id'
    })
    propriedade!: Propriedade;
}