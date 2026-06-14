import { Injectable } from '@nestjs/common';
import { Piquete } from './piquete.entity';
import { CreatePiqueteDto } from './dtos/create-piquete.dto';
import { UpdatePiqueteDto } from './dtos/update-piquete.dto';

@Injectable()
export class PiqueteService {

    async findAll(): Promise<Piquete[]> {
        return Piquete.find({ relations: ['propriedade'] });
    }

    async findOne(id: number): Promise<Piquete | null> {
        return Piquete.findOne({ where: { id }, relations: ['propriedade'] });
    }

    async create(dados: CreatePiqueteDto): Promise<Piquete> {
        const piquete = Piquete.create({
            ...dados,
            propriedade: { id: dados.propriedade },
        });
        return piquete.save();
    }

    async update(id: number, dados: UpdatePiqueteDto): Promise<Piquete | null> {
        const piquete = await this.findOne(id);
        if (!piquete) return null;
        Object.assign(piquete, {
            ...dados,
            propriedade: { id: dados.propriedade },
        });
        return piquete.save();
    }

    async remove(id: number): Promise<Piquete | null> {
        const piquete = await this.findOne(id);
        if (!piquete) return null;
        return piquete.remove();
    }
}