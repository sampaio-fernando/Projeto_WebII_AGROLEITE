import { Body, Controller, Get, Post, Redirect, Render } from "@nestjs/common";
import { InsumoService } from "./insumo.service";
import { ValidationView } from "nest-validation-view";
import { CreateInsumoDto } from "./dtos/create-insumo-dto";


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

    @Get('criar')
    @Render('insumo/formulario')
    async formularioCriar(): Promise<object> {
        return{
            titulo: 'Novo insumo',
        }
    }

    @Post('criar')
    @Redirect('/insumos')
    @ValidationView('insumo/formulario', ({ request, errors }) => ({
        insumo: {
            ...request.body
        },
        errors,
     }))
    async formularioCriarSalvar(@Body() dados: CreateInsumoDto): Promise<void> {
        await this. insumoService.create(dados);
    }
}