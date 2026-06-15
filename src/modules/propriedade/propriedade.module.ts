import { Module } from '@nestjs/common';
import { PropriedadeController } from './propriedade.controller';
import { PropriedadeService } from './propriedade.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [PropriedadeController],
    providers: [PropriedadeService],
    exports: [PropriedadeService],
})
export class PropriedadeModule {}