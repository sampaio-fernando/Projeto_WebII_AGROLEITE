import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { PiqueteService } from './piquete.service';
import { CreatePiqueteDto } from './dtos/create-piquete.dto';
import { UpdatePiqueteDto } from './dtos/update-piquete.dto';

@Controller('piquetes')
export class PiqueteController {

    constructor(
        private piqueteService: PiqueteService,
        private propriedadeService: PropriedadeService,
    ) {}

    @Get()
    @Render('piquete/inicial')
    async inicial(): Promise<object> {
        const piquetes = await this.piqueteService.findAll();
        return { titulo: 'Consulta de Piquetes', piquetes };
    }

    @Get('criar')
    @Render('piquete/formulario')
    async formularioCriar(): Promise<object> {
        const propriedades = await this.propriedadeService.findAll();
        return { titulo: 'Novo Piquete', propriedades };
    }

    @Post('criar')
    @Redirect('/piquetes')
    @ValidationView('piquete/formulario', ({ request, errors }) => ({
        piquete: { ...request.body },
        errors,
    }))
    async formularioCriarSalvar(@Body() dados: CreatePiqueteDto): Promise<void> {
        await this.piqueteService.create(dados);
    }

    @Get(':id/excluir')
    @Render('piquete/remover')
    async formExcluir(@Param('id') id: number): Promise<object> {
        const piquete = await this.piqueteService.findOne(id);
        if (!piquete) throw new Error('Piquete não encontrado!');
        return {
            titulo: 'Exclusão de Piquete',
            subtitulo: `Exclusão de piquete: ${piquete.nome}`,
            piquete,
        };
    }

    @Post(':id/excluir')
    @Redirect('/piquetes')
    async formExcluirSalvar(@Param('id') id: number): Promise<void> {
        await this.piqueteService.remove(id);
    }

    @Post(':id/remover')
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.piqueteService.remove(id);
    }
}