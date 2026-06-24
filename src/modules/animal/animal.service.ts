import { Inject, Injectable } from "@nestjs/common";
import { Animal } from "./animal.entity";
import { CreateAnimalDto } from "./dto/create-animal";
import { UpdateAnimalDto } from "./dto/update.animal";


@Injectable()
export class AnimalService {
    async findAll(): Promise<Animal[]> {
        return Animal.find({ relations: ['categoria', 'propriedade'] });
    }

    async findOne(id: number): Promise<Animal | null> {
        return Animal.findOne({
            where: { id },
            relations: ['categoria', 'propriedade']
        });
    }

    async create(dados: CreateAnimalDto): Promise<Animal> {
        const animal = Animal.create({ 
            ...dados, 
            categoria: { id: dados.categoria }, 
            propriedade: {id: dados.propriedade} });

            return animal.save();
    }

    async update(id: number, dados: UpdateAnimalDto): Promise<Animal | null> {
        const animal = await this.findOne(id);

        if(!animal){
            return null;
        }

        Object.assign(animal, { 
            ...dados, 
            categoria: { id: dados.categoria }, 
            propriedade: {id: dados.propriedade}
        })

        return animal.save();
    }

    async remove(id: number): Promise<Animal | null> {
        const animal = await this.findOne(id);

        if(!animal){
            return null;
        }
        return animal.remove();
    }
}