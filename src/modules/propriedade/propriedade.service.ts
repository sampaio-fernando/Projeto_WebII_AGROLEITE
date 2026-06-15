import { Injectable } from '@nestjs/common';
import { Propriedade } from './propriedade.entity';
import { CreatePropriedadeDto } from './dtos/create-propriedade.dto';
import { UpdatePropriedadeDto } from './dtos/update-propriedade.dto';

@Injectable()
export class PropriedadeService {

    async findAll(): Promise<Propriedade[]> {
        return Propriedade.find();
    }

    async findOne(id: number): Promise<Propriedade | null> {
        return Propriedade.findOne({ where: { id } });
    }

    async create(dados: CreatePropriedadeDto): Promise<Propriedade> {
        const propriedade = Propriedade.create({ ...dados });
        return propriedade.save();
    }

    async update(id: number, dados: UpdatePropriedadeDto): Promise<Propriedade | null> {
        const propriedade = await this.findOne(id);
        if (!propriedade) return null;
        Object.assign(propriedade, dados);
        return propriedade.save();
    }

    async remove(id: number): Promise<Propriedade | null> {
        const propriedade = await this.findOne(id);
        if (!propriedade) return null;
        return propriedade.remove();
    }
}