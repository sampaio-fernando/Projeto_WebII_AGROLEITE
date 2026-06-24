import { Injectable } from '@nestjs/common';
import { ProducaoMensal } from './producao_mensal.entity';
import { CreateProducaoMensalDto } from './dtos/create-producao_mensal.dto';
import { UpdateProducaoMensalDto } from './dtos/update-producao_mensal.dto';

@Injectable()
export class ProducaoMensalService {

    async findAll(): Promise<ProducaoMensal[]> {
        return ProducaoMensal.find();
    }

    async findOne(id: number): Promise<ProducaoMensal | null> {
        return ProducaoMensal.findOne({ where: { id } });
    }

    async create(dados: CreateProducaoMensalDto): Promise<ProducaoMensal> {
        const valorTotal = dados.qtdTotalLitros * dados.valorLitro;
        const producaoMensal = ProducaoMensal.create({ ...dados, valorTotal });
        return producaoMensal.save();
    }

    async update(id: number, dados: UpdateProducaoMensalDto): Promise<ProducaoMensal | null> {
        const producaoMensal = await this.findOne(id);
        if (!producaoMensal) return null;
        const valorTotal = dados.qtdTotalLitros * dados.valorLitro;
        Object.assign(producaoMensal, { ...dados, valorTotal });
        return producaoMensal.save();
    }

    async remove(id: number): Promise<ProducaoMensal | null> {
        const producaoMensal = await this.findOne(id);
        if (!producaoMensal) return null;
        return producaoMensal.remove();
    }
}