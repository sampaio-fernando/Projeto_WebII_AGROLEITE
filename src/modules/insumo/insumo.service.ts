import { Injectable } from "@nestjs/common";
import { Insumo } from "./insumo.entity";
import { CreateInsumoDto } from "./dtos/create-insumo-dto";
import { UpdateInsumoDto } from "./dtos/update-insumo-dto";


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

    async update(id: number, dados: UpdateInsumoDto): Promise<Insumo | null> {
        const insumo = await this.findOne(id);

        if(!insumo) {
            return null;
        }

        Object.assign(insumo, { ...dados });
        return insumo.save();
    }

    async remove(id:number): Promise<Insumo | null> {
        const insumo = await this.findOne(id);

        if(!insumo) {
            return null;
        }
        return insumo.remove();
    }
}