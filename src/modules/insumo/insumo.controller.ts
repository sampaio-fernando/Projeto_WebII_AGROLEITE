import { Body, Controller, Get, Post, Redirect, Render, Param, HttpCode} from "@nestjs/common";
import { InsumoService } from "./insumo.service";
import { ValidationView } from "nest-validation-view";
import { CreateInsumoDto } from "./dtos/create-insumo-dto";
import { request } from "node:http";
import { UpdateInsumoDto } from "./dtos/update-insumo-dto";


@Controller('insumos')
export class InsumoController {

    constructor(private insumoService: InsumoService) {}

    @Get()
    @Render('insumo/inicial')
    async inicial(): Promise<object> {
<<<<<<< Updated upstream
        const listaInsumos = await this.insumoService.findAll();
=======
        const insumos = await this.insumoService.findAll();

>>>>>>> Stashed changes
        return {
            titulo: 'Consulta de Insumos',
            insumos: listaInsumos
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

    @Get(':id/editar')
    @Render('insumo/formulario')
    async formEditar(@Param('id') id: number): Promise<object> {
        const insumo = await this.insumoService.findOne(id);
        
        if(!insumo) {
            throw new Error('Insumo não encontrado');
        }

        return {
            titulo: 'Edição de Insumo',
            subtitulo: `Atualização de insumo: ${insumo.descricao}`,
            insumo, 
        };
    }

    @Post(':id/editar')
    @Redirect('/insumos')
    @ValidationView('insumo/formulario' , ({ request, errors }) => ({
        insumo: {
            id: request.params.id,
            ...request.body
        },
        errors,
    }))
    async formEditarSalvar(@Param('id') id: number, @Body() dados: UpdateInsumoDto): Promise<void>{
        await this.insumoService.update(id, dados);
    }

    @Get(':id/excluir')
    @Render('insumo/remover')
    async formExcluir (@Param('id') id: number): Promise<object> {
        const insumo = await this.insumoService.findOne(id);

        if(!insumo) {
            throw new Error('Insumo não encontrado!');
        }
        return {
            titulo: 'Exclusão de Insumo',
            subtitulo: `Exclusão de insumo: ${insumo.descricao}`,
            insumo,
        };
    }

    @Post(':id/excluir')
        @Redirect('/insumos')
        async formExcluirSalvar(@Param('id') id: number): Promise<void>{
            await this.insumoService.remove(id);
        }

}