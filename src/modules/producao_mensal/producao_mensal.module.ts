import { Module } from '@nestjs/common';
import { ProducaoMensalController } from './producao_mensal.controller';
import { ProducaoMensalService } from './producao_mensal.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ProducaoMensalController],
    providers: [ProducaoMensalService],
    exports: [ProducaoMensalService],
})
export class ProducaoMensalModule {}