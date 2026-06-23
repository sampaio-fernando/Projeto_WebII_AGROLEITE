import { Injectable } from "@nestjs/common";
import { Insumo } from "./insumo.entity";
import { CreateInsumoDto } from "./dtos/create-insumo-dto";


@Injectable()
export class InsumoService {
    async findAll(): Promise<Insumo[]> {
        return Insumo.find();
    }

    async findOne(id: number): Promise<Insumo | null> {
        return Insumo.findOne({ where: { id } });
    }

    async create(dados: CreateInsumoDto): Promise<Insumo> {
        const insumo = Insumo.create({ ...dados})
        return insumo.save();
    }
}