import { Injectable } from "@nestjs/common";
import { Insumo } from "./insumo.entity";


@Injectable()
export class InsumoService {
    async findall(): Promise<Insumo[]> {
        return Insumo.find();
    }
}