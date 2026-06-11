import { Controller, Get, Render } from "@nestjs/common";
import { InsumoService } from "./insumo.service";


@Controller('insumos')
export class InsumoController {

    constructor(private insumoService: InsumoService) {}

    @Get()
    @Render('insumo/inicial')
    async inicial(): Promise<object> {
        const insumos = await this.insumoService.findall();

        return {
            titulo: 'Consulta de Insumos',
            insumos
        }
    }
}