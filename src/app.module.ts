import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { FornecedorModule } from './modules/fornecedor/fornecedor.module';
import { InsumoModule } from './modules/insumo/insumo.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { PiqueteModule } from './modules/piquete/piquete.module';
import { PropriedadeModule } from './modules/propriedade/propriedade.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ProdutoModule,
    FornecedorModule,
    InsumoModule,
    CategoriaModule,
    PiqueteModule,
    PropriedadeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}