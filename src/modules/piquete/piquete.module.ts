import { Module } from '@nestjs/common';
import { PiqueteController } from './piquete.controller';
import { PiqueteService } from './piquete.service';
import { PropriedadeService } from '../propriedade/propriedade.service';
import { DatabaseModule } from '../../config/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [PiqueteController],
    providers: [PiqueteService, PropriedadeService],
})
export class PiqueteModule {}