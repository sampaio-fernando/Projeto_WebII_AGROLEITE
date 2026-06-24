import { Module } from "@nestjs/common";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";
import { CategoriaService } from "../categoria/categoria.service";
import { PropriedadeService } from "../propriedade/propriedade.service";


@Module({
    imports: [],
    controllers: [AnimalController],
    providers: [AnimalService, CategoriaService, PropriedadeService],
})
export class AnimalModule {}