import { Injectable } from "@nestjs/common";
import { Insumo } from "./insumo.entity";
import { CreateInsumoDto } from "./dtos/create-insumo-dto";


@Injectable()
export class InsumoService {
    create(dados: CreateInsumoDto) {
        throw new Error("Method not implemented.");
    }
    async findall(): Promise<Insumo[]> {
        return Insumo.find();
    }
}