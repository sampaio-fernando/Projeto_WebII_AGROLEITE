import { Injectable } from '@nestjs/common';
import { Estoque } from './estoque.entity';
import { CreateEstoqueDto } from './dtos/create-estoque.dto';
import { UpdateEstoqueDto } from './dtos/update-estoque.dto';

@Injectable()
export class EstoqueService {

    async findAll(): Promise<Estoque[]> {
        return Estoque.find({ relations: ['insumo'] });
    }

    async findOne(id: number): Promise<Estoque | null> {
        return Estoque.findOne({ where: { id }, relations: ['insumo'] });
    }

    async create(dados: CreateEstoqueDto): Promise<Estoque> {
        const estoque = Estoque.create({
            ...dados,
            insumo: { id: dados.insumo },
        });
        return estoque.save();
    }

    async update(id: number, dados: UpdateEstoqueDto): Promise<Estoque | null> {
        const estoque = await this.findOne(id);
        if (!estoque) return null;
        Object.assign(estoque, { ...dados, insumo: { id: dados.insumo } });
        return estoque.save();
    }

    async remove(id: number): Promise<Estoque | null> {
        const estoque = await this.findOne(id);
        if (!estoque) return null;
        return estoque.remove();
    }
}