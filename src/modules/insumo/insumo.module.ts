import { Module } from "@nestjs/common";
import { InsumoController } from "./insumo.controller";
import { InsumoService } from "./insumo.service";


@Module({
    imports: [],
    controllers: [InsumoController],
    providers: [InsumoService],
    exports: []
})
export class InsumoModule {}