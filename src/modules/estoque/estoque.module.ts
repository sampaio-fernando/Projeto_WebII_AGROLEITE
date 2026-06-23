import { Module } from '@nestjs/common';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { InsumoService } from '../insumo/insumo.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [EstoqueController],
    providers: [EstoqueService, InsumoService],
})
export class EstoqueModule {}