import { Body, Controller, Get, HttpCode, Param, Post, Redirect, Render } from '@nestjs/common';
import { ValidationView } from 'nest-validation-view';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { PiqueteService } from './piquete.service';
import { CreatePiqueteDto } from './dtos/create-piquete.dto';
import { UpdatePiqueteDto } from './dtos/update-piquete.dto';

@Controller('piquete')
export class PiqueteController {

    constructor(
        private piqueteService: PiqueteService,
        
    ) {}

    @Get()
    @Render('piquete/inicial')
    async inicial(): Promise<object> {
        const piquete = await this.piqueteService.findAll();
        return { titulo: 'Consulta de Piquetes', piquete };
    }

}